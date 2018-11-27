import $ from 'jquery/dist/jquery'
import 'bootstrap/js/dist/util'
import 'bootstrap/js/dist/scrollspy'

$(() => {
  $('#nav-anchors').find('a.nav-link').click(function () {
    const $dest = $($(this).attr('href'))
    $('html, body').animate({
      scrollTop: $dest.offset().top - 72
    }, 500)
    return false
  })
})
