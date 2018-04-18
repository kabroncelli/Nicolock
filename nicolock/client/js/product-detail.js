import $ from 'jquery'

const productDetail = function () {
  $(function () {
    $('.product-section .title').click(function (e) {
      e.preventDefault()
      $(this).parent('.product-section').toggleClass('is-active')
      $(this).siblings('.product-section-content').slideToggle()
    })

    // grab the width and calculate left value
    var itemWidth = $('.product-image-shelf-container .product-thumbnail-wrap').outerWidth() + 10
    var leftValue = itemWidth * (-1)
    var trackContainer = $('.product-image-shelf-container').width()
    var trackWidth = ($('.product-thumbnail-wrap').length * itemWidth)

    // move the last item before first item, just in case user click prev button
    if (trackWidth > trackContainer) {
      $('.product-thumbnail-wrap:first').before($('.product-thumbnail-wrap:last'))
      // set the default item to the correct position
      $('.product-image-shelf-container').css({'left': leftValue})
      $('.product-image-shelf .icon').show()
    }

    $(window).on('resize', function () {
      var trackContainer = $('.product-image-shelf-container').width()
      var trackWidth = ($('.product-thumbnail-wrap').length * itemWidth)
      if (trackWidth > trackContainer) {
        $('.product-image-shelf .icon').show()
      } else {
        $('.product-image-shelf .icon').hide()
      }
    })

    $('.icon-left').click(function () {
      if (!$('.product-image-shelf-container').is(':animated')) {
        // get the right position
        var leftIndent = parseInt($('.product-image-shelf-container').css('left')) + itemWidth

        // slide the item
        $('.product-image-shelf-container').animate({'left': leftIndent}, 200, function () {
          // move the last item and put it as first item
          $('.product-thumbnail-wrap:first').before($('.product-thumbnail-wrap:last'))

          // set the default item to correct position
          $('.product-image-shelf-container').css({'left': leftValue})
        })
      }
    })

    $('.icon-right').click(function () {
      if (!$('.product-image-shelf-container').is(':animated')) {
        // get the right position
        var leftIndent = parseInt($('.product-image-shelf-container').css('left')) - itemWidth
        // slide the item
        $('.product-image-shelf-container').animate({'left': leftIndent}, 200, function () {
          // move the last item and put it as first item
          $('.product-thumbnail-wrap:last').after($('.product-thumbnail-wrap:first'))

          // set the default item to correct position
          $('.product-image-shelf-container').css({'left': leftValue})
        })
      }
    })

    $('.product-thumbnail').click(function (e) {
      e.preventDefault()
      var original = $(this).attr('data-original')
      var imageId = $(this).attr('data-id')
      var description = $(this).attr('data-description')
      $('.product-featured-image').fadeOut('slow', function () {
        $('.product-featured-image').attr('src', original)
        $('.product-featured-image').fadeIn('slow')
      })
      $('.product-featured-image').attr('data-id', imageId)
      if (description === '') {
        $('.product-image-description').text('N/A')
      } else {
        $('.product-image-description').text(description)
      }
      window.history.pushState({}, '', '?image=' + imageId)
      $('#add-to-gallery').attr('action', '/galleries/' + imageId + '/add-product-image/')
    })

    $('.download-icon').click(function (e) {
      e.preventDefault()
      const imageUrl = this.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.attributes.src.value
      const imageName = this.parentElement.parentElement.firstElementChild.nextElementSibling.textContent.replace(' ', '_').replace(/\W/g, '').toLowerCase()
      const link = document.createElement('a')
      link.download = imageName
      link.href = imageUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })

    $('.print-icon').click(function (e) {
      e.preventDefault()
      const image = this.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.attributes.src.value
      const printWindow = window.open(image, '_blank')
      printWindow.onload = () => {
        printWindow.print()
      }
    })

    // $('.gallery-icon').click(function (e) {
    //   e.preventDefault()
    //   $('.product-modal-wrap').removeClass('is-visible')
    //   $('.add-gallery-modal-wrap').addClass('is-visible')
    // })

    $('.product-modal-trigger').click(function (e) {
      e.preventDefault()
      var original = $(this).attr('data-original')
      var title = $(this).attr('data-title')
      var description = $(this).attr('data-description')
      $('.product-modal-image').attr('src', original)
      $('.product-modal-image').fadeIn(1000)
      $('.product-modal-footer .title').text(title)
      $('.product-modal-footer .paragraph').text(description)
      $('.product-modal-wrap').addClass('is-visible')
    })

    $('.product-modal .trigger-close').click(function (e) {
      e.preventDefault()
      $('.product-modal-wrap').removeClass('is-visible')
      $('.product-modal-image').fadeOut(100)
      $('.product-modal-image').attr('src', '')
      $('.product-modal-footer .title').text('')
      $('.product-modal-footer .paragraph').text('')
    })

    $('.related-video-modal-trigger').click(function (e) {
      e.preventDefault()
      var videoUrl = $(this).attr('data-video')
      $('.related-video-iframe').attr('src', videoUrl)
      $('.related-video-modal-wrap').addClass('is-visible')
    })

    $('.related-video-modal .trigger-close').click(function (e) {
      e.preventDefault()
      $('.related-video-modal-wrap').removeClass('is-visible')
      $('.related-video-iframe').attr('src', '')
    })

    function setActiveMenu () {
      var productUrl = window.location.pathname
      var regExp = /[^/]+/g
      var match = productUrl.match(regExp)
      var param1 = ''
      if (match && match.length > 1) {
        param1 = match[1].replace('-', ' ')
      } else {
        param1 = ''
      }
      var param2 = ''
      if (match && match.length > 2) {
        param2 = match[2].replace('-', ' ')
      } else {
        param2 = ''
      }
      $('.product-menu-category .parent').each(function (i, link) {
        if (param1) {
          if ($(link).text().toLowerCase() === param1) {
            $(link).parent('.product-menu-category').addClass('is-active')
            $(link).siblings('.product-menu-child').slideDown()
            $(link).siblings('.product-menu-child').children('li').each(function (i, childLink) {
              if (childLink.innerText.toLowerCase() === param2) {
                $(childLink).children('.child').addClass('is-active')
                return false
              }
            })
            return false
          }
        }
      })
    }

    setActiveMenu()

    $('.product-menu-category .parent').click(function (e) {
      e.preventDefault()
      if ($(this).parent('.product-menu-category').hasClass('is-active')) {
        $(this).siblings('.product-menu-child').slideUp()
      } else {
        $(this).siblings('.product-menu-child').slideDown()
      }
      $(this).parent('.product-menu-category').toggleClass('is-active')
    })

    $('#gallery-add').click(function (e) {
      e.preventDefault()
      $('.add-gallery-modal-wrap').addClass('is-visible')
    })

    $('.add-gallery-modal .trigger-close').click(function (e) {
      e.preventDefault()
      $('.add-gallery-modal-wrap').removeClass('is-visible')
    })

    $('.download-trigger').click(function (e) {
      e.preventDefault()
      $('.download-modal-wrap').addClass('is-visible')
    })

    $('.download-modal .trigger-close').click(function (e) {
      e.preventDefault()
      $('.download-modal-wrap').removeClass('is-visible')
    })

    $('.embed-trigger').click(function (e) {
      e.preventDefault()
      $('.embed-modal-wrap').addClass('is-visible')
    })

    $('.embed-modal .trigger-close').click(function (e) {
      e.preventDefault()
      $('.embed-modal-wrap').removeClass('is-visible')
    })

    $('#download-specs').click((e) => {
      e.preventDefault()
      const checkedItems = $('.download-items input:checked')
      const fileIds = checkedItems.toArray().map((item) => { return `id=${item.value}` })
      const params = fileIds.join('&')
      const url = '/products/file-download?' + params
      const win = window.open(url, '_blank')
      if (win) {
        // Browser has allowed it to be opened
        win.focus()
      } else {
        // Browser has blocked it
        alert('Please allow popups for this website')
      }
    })

    $('.spec-chart-trigger').click(function (e) {
      e.preventDefault()
      $('.spec-chart-modal-wrap').addClass('is-visible')
    })

    $('.spec-chart-modal .trigger-close').click(function (e) {
      e.preventDefault()
      $('.spec-chart-modal-wrap').removeClass('is-visible')
    })
  })
}

export default productDetail
