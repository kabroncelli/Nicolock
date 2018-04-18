import $ from 'jquery'

const share = function () {
  $(function () {
    $('.fb-share-link').click(function (e) {
      e.preventDefault()
      FB.ui(
        {
          method: 'share',
          href: location.origin + location.pathname,
        },
        // callback
        function (response) {
          if (response && !response.error_message) {
            alert('Posting completed.')
          } else {
            alert('Error while posting.')
          }
        }
      )
    })

    $('.houzz-share-button').click(function (e) {
      e.preventDefault()

      var link = $(this).attr('data-url')
      var hzid = $(this).attr('data-hzid')
      var title = $(this).attr('data-title')
      var image = $(this).attr('data-img')

      var popout = 'http://www.houzz.com/imageClipperUpload'
      popout += '?link=' + encodeURIComponent(link)
      popout += '&source=button'
      popout += '&hzid=' + hzid
      popout += '&imageUrl=' + encodeURIComponent(image)
      popout += '&title=' + encodeURIComponent(title)
      popout += '&ref=' + encodeURIComponent(location.origin + location.pathname)

      var popupWidth = 900
      var popupHeight = 480
      var left = Math.floor((screen.width - popupWidth) / 2)
      var top = Math.floor((screen.height - popupHeight) / 2)
      window.open(popout, 'HOUZZ' + new Date().getTime(), 'status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=' + popupWidth + ',height=' + popupHeight + ',left=' + left + ',top=' + top)
    })

    $('.pinterest-button').click(function (e) {
      e.preventDefault()
      PinUtils.pinAny()
    })
  })
}

export default share
