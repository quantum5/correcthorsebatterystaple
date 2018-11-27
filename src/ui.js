import $ from 'jquery/dist/jquery'
import 'form-serializer/jquery.serialize-object'

import { generate, computeBits } from './generator'

$(() => {
  const $options = $('#options-form')
  const $output = $('#generated-password')
  const $bits = $('#password-bits').find('div')
  const classes = 'bg-danger bg-warning bg-info bg-success'

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

  if (window.crypto && window.crypto.getRandomValues) {
    $('#too-old').hide()

    $('#run-generator').click(() => {
      const options = $options.serializeObject()
      $output.val(generate(options))
      return false
    })

    $options.find('select, input').change(updateBitMeter)
    $options.find('input[type=nubmer]').on('input', updateBitMeter)
    updateBitMeter()
  }
})
