function cleanBlock(name) {
    block = blocks.querySelector(`[name='${name}']`)
    block?.removeAttribute('name')
    block?.removeAttribute('style')
}

function changeBlock(el) {
    if(el.value < 1 || el.value > 9) {
        el.value = ''
        cleanBlock(el.name)
        return
    }

    id = `block${el.value}`
    if(el.value !== '') {
        block = document.getElementById(id)

        inputName = block.getAttribute('name')
        if(inputName) list.querySelector(`[name='${inputName}']`).value = ''
        
        oldBlock = blocks.querySelector(`[name='${el.name}']`)
        oldBlock?.removeAttribute('name')
        oldBlock?.removeAttribute('style')

        block.style.backgroundImage    = `url(src/img/dreams/${el.name}.png)`
        block.style.backgroundSize     = 'contain'
        block.style.backgroundRepeat   = 'no-repeat'
        block.style.backgroundPosition = 'center center'
        block.style.color              = 'transparent'
        block.setAttribute('name', el.name)
    } else {
        cleanBlock(el.name)
    }
}