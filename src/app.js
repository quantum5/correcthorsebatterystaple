import './app.scss'
import $ from 'jquery/dist/jquery'
import 'bootstrap/js/dist/util'
import 'bootstrap/js/dist/scrollspy'
import './clipboard'

$(() => {
  $('#nav-anchors').find('a.nav-link').click(function () {
    const $dest = $($(this).attr('href'))
    $('html, body').animate({
      scrollTop: $dest.offset().top - 72
    }, 500)
    return false
  })
})
