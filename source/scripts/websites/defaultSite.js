export default class DefaultSite {
    constructor() {
        const MOUSE_VISITED_CLASSNAME = 'crx_mouse_visited';
        let prevDOM = null
        let selectingDOM = false
        let selectedElements = []

        const initSelectedElements = () => {
            // get fetch existing selectedElementsget fetch existing selectedElements
            chrome.storage.local.get(['selectedElements'], function (result) {
                console.log('result.selectedElements', result.selectedElements)

                selectedElements = result.selectedElements || []
            })
        }

        const clearSelection = () => {
            unstyleSelectedElements()

            selectedElements = []
            $(document).unbind('mousemove')
        }

        const unstyleSelectedElements = () => {
            if (selectedElements.length > 0) {
                selectedElements.forEach(el => {
                    // console.log('el in selectedElements', el)
                    el.classList.remove(MOUSE_VISITED_CLASSNAME);
                })
            }
        }

        const styleSelectedElements = () => {
            if (selectedElements.length > 0) {
                selectedElements.forEach(el => {
                    // console.log('el in selectedElements', el)
                    el.classList.add(MOUSE_VISITED_CLASSNAME);
                })
            }
        }

        const clicked_browser_action = () => {
            const sel = window.getSelection()
            const selectionText = sel.toString()
            // console.log('selectionText', selectionText)
            let customFields = {}
            let closestId = ''

            if (sel && sel.rangeCount > 0) {
                const selectionEl = sel.getRangeAt(0).startContainer.parentNode

                if (selectionEl.id) {
                    closestId = selectionEl.id
                }
                else {
                    const prevSibling = $(selectionEl).prev('[id]')
                    const prevParent = $(selectionEl).closest('[id]')

                    if (prevSibling.length > 0) {
                        closestId = prevSibling[0].id
                    }
                    else if (prevParent.length > 0) {
                        closestId = prevParent[0].id
                    }
                }

                if (closestId) {
                    urlOverride = `${location.href}#${closestId}`
                }
            }
            if (selectedElements.length > 0) {

                const selectedFields = parseSelectedElements()

                customFields = {
                    ...customFields,
                    ...selectedFields
                }
            }
        }

        const addSelection = () => {
            selectingDOM = true

            console.log('in addSelection in content script')
            sendResponse({ ack: true })

            $(document).mousemove(function (e) {
                var target = e.target;

                // console.log('target', target)
                const whiteListedNodes = ['DIV', 'IMG', 'A', 'P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5']

                // if (whiteListedClasses && target.class)
                // TODO - perhaps we should restrict what elements can be added? 
                // do it by source

                if (whiteListedNodes.includes(target.nodeName)) {
                    // For NPE checking, we check safely. We need to remove the class name
                    // Since we will be styling the new one after.
                    if (prevDOM != null && !selectedElements.includes(prevDOM)) {
                        prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
                    }
                    // Add a visited class name to the element. So we can style it.
                    target.classList.add(MOUSE_VISITED_CLASSNAME);
                    // The current element is now the previous. So we can remove the class
                    // during the next iteration.
                    prevDOM = target;
                }
            })
        }

        const cancelSelection = () => {
            selectingDOM = false
            $(document).unbind('mousemove')
        }
    }
}