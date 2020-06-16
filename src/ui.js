import $ from 'jquery/dist/jquery'
import 'form-serializer/jquery.serialize-object'

import { generate, computeBits, defaultSymbol } from './generator'

$(() => {
  const $options = $('#options-form')
  const $output = $('#generated-password')
  const $bits = $('#password-bits').find('div')
  const classes = 'bg-danger bg-warning bg-info bg-success'
  const defaults = {
    list: 'small',
    count: 4,
  }

  function bitClass (bits) {
    if (bits < 44) {
      return 'bg-danger'
    } else if (bits < 64) {
      return 'bg-warning'
    } else if (bits < 80) {
      return 'bg-info'
    } else {
      return 'bg-success'
    }
  }

  function bitRound (value) {
    const rounded = Math.round(value)
    return rounded === value ? value : `≈ ${rounded}`
  }

  function updateBitMeter () {
    const options = $options.serializeObject()
    const bits = computeBits(options)
    const maxBits = 96
    $bits
      .removeClass(classes)
      .addClass(bitClass(bits))
      .text(`${bitRound(bits)} bits`)
      .css('width', `${bits / maxBits * 100}%`)
      .attr('aria-valuenow', bits)
      .attr('aria-valuemax', maxBits)
  }

  function loadSettings (settings) {
    $('#word-list').val(settings.list || 'small')
    $('#word-count').val(settings.count || 4)
    $options.find(':checkbox').each(function () {
      $(this).prop('checked', !!settings[this.name])
    })
    $('#separator-symbol').val(settings.separator || defaultSymbol)
    updateBitMeter()
  }

  if (window.crypto && window.crypto.getRandomValues) {
    $('#too-old').hide()

    $('#run-generator').click(() => {
      const options = $options.serializeObject()
      $output.val(generate(options))
      return false
    })

    $('#save-settings').click(() => {
      const options = $options.serializeObject()
      window.localStorage.setItem('settings', JSON.stringify(options))
      return false
    })

    $('#clear-settings').click(() => {
      window.localStorage.removeItem('settings')
      loadSettings(defaults)
      return false
    })

    $options.find('select, input').change(updateBitMeter)
    $options.find('input[type=nubmer]').on('input', updateBitMeter)
    updateBitMeter()
  }

  const settings = window.localStorage.getItem('settings')
  if (settings) {
    try {
      loadSettings(JSON.parse(settings))
    } catch (e) {
      console.log(e)
    }
  }
})
