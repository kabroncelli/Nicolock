import $ from 'jquery'

const general = function () {
  $(function () {
    if (localStorage.getItem('Login')) {
      $('.lk-content').append('<div class="alert alert-success">You have successfully logged in.</div>')
      localStorage.removeItem('Login')
    }

    $('.modal-trigger').click(function (e) {
      e.preventDefault()
      var view = $(this).attr('data-authentication')
      if (view === 'logout') {
        $('.modal-container').addClass('position-' + view)
      }
      $('.modal-wrap').addClass('is-visible')
    })

    $('.modal-transition').click(function (e) {
      e.preventDefault()
      var view = $(this).attr('data-authentication')
      if (view === 'register') {
        $('.modal-container').removeClass('position-login')
        $('.modal-container').addClass('position-' + view)
      }
      if (view === 'login') {
        $('.modal-container').removeClass('position-register position-reset')
        $('.modal-container').addClass('position-' + view)
      }
      if (view === 'reset') {
        $('.modal-container').addClass('position-' + view)
      }
    })

    $('.modal .trigger-close').click(function (e) {
      e.preventDefault()
      $('.modal-wrap').removeClass('is-visible')
      $('.modal-container').removeClass('position-register position-reset')
      $('.modal-container').addClass('position-login')
    })

    $('.nav-trigger').click(function (e) {
      e.preventDefault()
      $('body').toggleClass('show-menu')
    })

    $('nav .trigger-close').click(function (e) {
      e.preventDefault()
      $('body').toggleClass('show-menu')
    })

    $(document).mouseup(function (e) {
      var menuContainer = $('.menu-wrap')
      var downloadContainer = $('.download-modal')
      if (!menuContainer.is(e.target) && menuContainer.has(e.target).length === 0) {
        menuContainer.removeClass('is-visible')
      }
      if (!downloadContainer.is(e.target) && downloadContainer.has(e.target).length === 0) {
        $('.download-modal-wrap').removeClass('is-visible')
      }
    })

    $('.desktop.menu-wrap .trigger-close').click(function (e) {
      e.preventDefault()
      $('.desktop.menu-wrap').toggleClass('is-visible')
    })

    $('.trifold-menu-trigger').click(function (e) {
      e.preventDefault()
      $('.trifold-detail, .trifold-sidebar').toggleClass('show-sidebar')
      $('body').toggleClass('has-sidebar')
    })

    $('.bifold-content .trifold-menu-trigger').click(function (e) {
      e.preventDefault()
      $('.bifold-content, .bifold-sidebar').toggleClass('show-sidebar')
      $('body').toggleClass('has-sidebar')
    })

    // MISC MENU STUFF
    function setActiveMenu () {
      var pageUrl = window.location.pathname
      var regExp = /[^/]+/g
      var match = pageUrl.match(regExp)
      var param1 = ''
      if (match && match.length > 1) {
        param1 = match[1].replace('-', ' ')
      } else {
        param1 = ''
      }
      var param2
      if (match && match.length > 2) {
        param2 = match[2].replace('-', ' ')
      } else {
        param2 = ''
      }
      $('.misc-menu-category .parent').each(function (i, link) {
        if (param1) {
          if ($(link).text().toLowerCase() === param1) {
            $(link).parent('.misc-menu-category').addClass('is-active')
            $(link).siblings('.misc-menu-child').slideDown()
            $(link).siblings('.misc-menu-child').children('li').each(function (i, childLink) {
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

    $('.misc-menu-category.has-children .parent').click(function (e) {
      e.preventDefault()
      if ($(this).parent('.misc-menu-category').hasClass('is-active')) {
        $(this).siblings('.misc-menu-child').slideUp()
      } else {
        $(this).siblings('.misc-menu-child').slideDown()
      }
      $(this).parent('.misc-menu-category').toggleClass('is-active')
    })
  })
}

export default general
