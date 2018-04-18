import $ from 'jquery'

const downloadSpecs = function () {
  $(function () {
    $('.product-download-button').click(function (e) {
      e.preventDefault()
      const productId = $(this).attr('data-id')
      $(`.product${productId}`).addClass('is-visible')
    })
  })
}

export default downloadSpecs
