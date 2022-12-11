import { svgService } from './services/svg.service.js'

const edit = {
  mounted: (el, binding) => {
    el.setAttribute('contenteditable', binding.value)
  },
  updated: (el, binding) => {
    el.setAttribute('contenteditable', binding.value)
  },
}

const icon = {
  mounted: (el, binding) => {
    const icon = svgService.getMondayMainSvg(binding.value)
    el.innerHTML = icon
  },
}
const iconK={
  mounted: (el, binding) => {
    const icon = svgService.getMondayKanbanSvg(binding.value)
    el.innerHTML = icon
  },
}
 



export { edit, icon,iconK }