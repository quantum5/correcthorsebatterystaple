const Clipboard = require('clipboard/dist/clipboard')
import $ from 'jquery/dist/jquery'
import 'popper.js'
import 'bootstrap/js/dist/tooltip'

export function showTooltip ($element, message) {
    $element.tooltip('dispose')
      .attr('data-original-title', message)
      .tooltip('show')

    setTimeout(() => $element.tooltip('dispose'), 1000)
  }

$(() => {
  new Clipboard('.copy', {})
    .on('success', e => showTooltip($(e.trigger), 'Copied!'))
    .on('error', e => showTooltip($(e.trigger), 'Failed to copy!'))
})
