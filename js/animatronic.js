window.addEventListener('load', () => {
  AOS.init({
    once: false
  })

  function togglerFn(target) {
    const menuClass = 'mobile-menu-active'
    const togglerClass = 'toggle-active'

    if (menuRef.classList.contains(menuClass)) {
      target.classList.remove(togglerClass)
      document.body.style.removeProperty('overflow')
      document.querySelector('html').style.removeProperty('overflow')
      menuRef.classList.remove(menuClass)
    } else {
      target.classList.add(togglerClass)
      document.body.style.setProperty('overflow', 'hidden')
      document.querySelector('html').style.setProperty('overflow', 'hidden')
      menuRef.classList.add(menuClass)
    }
  }

  const menuRef = document.querySelector('#mobile_menu')
  const menuTogglers = Array.from(document.querySelectorAll('.menu-toggler'))

  for (toggler of menuTogglers) {
    toggler.onclick = () => {
      togglerFn(toggler)
    }
  }
})