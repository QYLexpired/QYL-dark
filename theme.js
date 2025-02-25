// 块提示
document.addEventListener('selectionchange', function() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const node = range.startContainer;
        let element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;

        while (element && !element.classList.contains('protyle-wysiwyg')) {
            element = element.parentElement;
        }

        if (element && element.classList.contains('protyle-wysiwyg')) {
            const highlightedElements = element.querySelectorAll('.highlight');
            highlightedElements.forEach(el => el.classList.remove('highlight'));

            let targetElement = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
            while (targetElement && (!element.contains(targetElement) || !targetElement.classList.contains('p'))) {
                targetElement = targetElement.parentElement;
            }

            if (targetElement && targetElement.classList.contains('p')) {
                targetElement.classList.add('highlight');
            }
        }
    }
});

// 状态栏拖动
moveableStatus();
function moveableStatus(status) {
    let isDragging = false;
    let isDragged = false;
    let offsetX, offsetY;
    let left='0px', top='0px';
    let width = 0, height = 0;
    const originStyle = {};

    if(!status) status = document.querySelector('#status');

    // 初始时计算宽高和位置
    const calcStatusStyle = () => {
        let style = getComputedStyle(status, null);
        if(!isDragged) {
            // 如果静态元素设置为固定元素
            if(style.position === 'static') {
                status.style.position = 'fixed';
                status.style.setProperty('right', '42px', 'important');
                status.style.bottom = '-8px';
                style = getComputedStyle(status, null);
            }
            // 计算状态栏宽高
            const marginWidth = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
            const marginHeight = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
            width = parseFloat(style.width) + marginWidth;
            height = parseFloat(style.height) + marginHeight;

            // 记录状态栏初始样式
            originStyle.position = style.position;
            originStyle.right = style.right;
            originStyle.bottom = style.bottom;

            // 计算状态栏位置
            left = window.innerWidth - (parseFloat(style.right) + width) + 'px';
            top = window.innerHeight - (parseFloat(style.bottom) + height) + 'px';
        }
    };
    
    // 改变窗口大小事件
    window.addEventListener("resize", (event)=>{
        if (isDragged) {
            if(parseFloat(status.style.left) > window.innerWidth) {
                status.style.left = (window.innerWidth - width) + 'px';
            }
            if(parseFloat(status.style.top) > window.innerHeight) {
                status.style.top = (window.innerHeight - height) + 'px';
            }
        }
    });

    // 双击恢复状态栏
    status.addEventListener("dblclick", (event)=>{
        isDragged = false;
        status.style.position = originStyle.position;
        status.style.setProperty('right', originStyle.right, 'important');
        status.style.bottom = originStyle.bottom;
        status.style.left = 'auto';
        status.style.top = 'auto';
    });

    // 拖动事件
    const dragHandler = (e) => {
        if (e.type === 'mousedown') {
            // 开始拖动
            calcStatusStyle();
            if(!isDragged) {
                isDragged = true;
                status.style.position = 'absolute';
                status.style.setProperty('right', 'auto', 'important');
                status.style.bottom = 'auto';
                status.style.left = left;
                status.style.top = top;
            }
            isDragging = true;
            document.removeEventListener('mousemove', dragHandler);
            document.removeEventListener('mouseup', dragHandler);
            document.addEventListener('mousemove', dragHandler);
            document.addEventListener('mouseup', dragHandler);
            offsetX = e.clientX - status.offsetLeft;
            offsetY = e.clientY - status.offsetTop;
        } else if (e.type === 'mousemove' && isDragging) {
            // 拖动中
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;
            //限制不超过窗口大小
            if(x < 0) x = 0;
            if(y < 0) y = 0;
            if(x > window.innerWidth - width) x = window.innerWidth - width;
            if(y > window.innerHeight - height) y = window.innerHeight - height;
            // 设置状态栏坐标
            status.style.left = x + 'px';
            status.style.top = y + 'px';
        } else if (e.type === 'mouseup') {
            //结束拖动
            isDragging = false;
            document.removeEventListener('mousemove', dragHandler);
            document.removeEventListener('mouseup', dragHandler);
        }
        e.preventDefault();
    };
    status.removeEventListener('mousedown', dragHandler);
    status.addEventListener('mousedown', dragHandler);
}

// 添加Q按钮
(function() {
    addThemeToolBar();
})();

// Q按钮定义/Q按钮关闭设置窗口
function addThemeToolBar() {
    var QYLToolBar = document.getElementById("QToolbar");
    if (!QYLToolBar) {
        var toolbarVIP = document.getElementById("toolbarVIP");
        var windowControls = document.getElementById("windowControls");
        QYLToolBar = document.createElement("div");
        QYLToolBar.id = "QToolbar";
        QYLToolBar.className = "toolbar__item ariaLabel";
        QYLToolBar.style.width = "23.5px";
        QYLToolBar.style.height = "23.5px";
        QYLToolBar.innerHTML = `<svg t="1740459440028" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14055" width="24" height="24"><path d="M612.6 947.5c33 0 60-27 60-60s-27-60-60-60-60 27-60 60 27 60 60 60z" fill="#9aa0a6" p-id="14056"></path><path d="M597.9 891.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14057"></path><path d="M583 894.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14058"></path><path d="M568 896.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14059"></path><path d="M552.9 898.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14060"></path><path d="M537.8 899.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14061"></path><path d="M522.6 900.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14062"></path><path d="M507.4 900.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14063"></path><path d="M492.2 900.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14064"></path><path d="M477 899.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14065"></path><path d="M461.9 897.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14066"></path><path d="M446.9 895.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14067"></path><path d="M432 892.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14068"></path><path d="M417.2 888.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14069"></path><path d="M402.5 884.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14070"></path><path d="M388 880.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14071"></path><path d="M373.7 875.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14072"></path><path d="M359.6 869.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14073"></path><path d="M345.7 863.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14074"></path><path d="M332.1 856.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14075"></path><path d="M318.8 849.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14076"></path><path d="M305.7 841.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14077"></path><path d="M293 833.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14078"></path><path d="M280.6 824.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14079"></path><path d="M268.6 815m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14080"></path><path d="M256.9 805.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14081"></path><path d="M245.7 795.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14082"></path><path d="M234.8 784.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14083"></path><path d="M224.4 773.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14084"></path><path d="M214.4 761.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14085"></path><path d="M204.9 750.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14086"></path><path d="M195.7 737.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14087"></path><path d="M187.1 725.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14088"></path><path d="M179 712.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14089"></path><path d="M171.5 699.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14090"></path><path d="M164.4 685.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14091"></path><path d="M157.8 672.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14092"></path><path d="M151.8 658.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14093"></path><path d="M146.4 644m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14094"></path><path d="M141.6 629.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14095"></path><path d="M137.3 615m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14096"></path><path d="M133.5 600.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14097"></path><path d="M130.3 585.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14098"></path><path d="M127.8 570.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14099"></path><path d="M125.8 555.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14100"></path><path d="M124.5 540.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14101"></path><path d="M123.6 525.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14102"></path><path d="M123.4 509.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14103"></path><path d="M123.7 494.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14104"></path><path d="M124.8 479.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14105"></path><path d="M126.3 464.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14106"></path><path d="M128.5 449.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14107"></path><path d="M131.2 434.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14108"></path><path d="M134.4 419.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14109"></path><path d="M138.4 404.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14110"></path><path d="M142.9 390.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14111"></path><path d="M147.9 376m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14112"></path><path d="M153.5 361.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14113"></path><path d="M159.5 347.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14114"></path><path d="M166.3 334.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14115"></path><path d="M173.5 321m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14116"></path><path d="M181.3 307.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14117"></path><path d="M189.5 295.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14118"></path><path d="M198.2 282.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14119"></path><path d="M207.5 270.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14120"></path><path d="M217.2 258.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14121"></path><path d="M227.3 247.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14122"></path><path d="M237.8 236.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14123"></path><path d="M248.8 226.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14124"></path><path d="M260.2 216m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14125"></path><path d="M272 206.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14126"></path><path d="M284.1 197.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14127"></path><path d="M296.5 188.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14128"></path><path d="M309.4 180.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14129"></path><path d="M322.5 172.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14130"></path><path d="M335.9 165.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14131"></path><path d="M349.5 158.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14132"></path><path d="M363.5 152.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14133"></path><path d="M377.7 147.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14134"></path><path d="M392 142.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14135"></path><path d="M406.6 137.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14136"></path><path d="M421.3 134m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14137"></path><path d="M436.1 130.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14138"></path><path d="M451.1 128.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14139"></path><path d="M466.2 126.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14140"></path><path d="M481.3 124.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14141"></path><path d="M496.4 123.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14142"></path><path d="M511.6 123.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14143"></path><path d="M526.8 123.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14144"></path><path d="M542 124.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14145"></path><path d="M557.1 126m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14146"></path><path d="M572.2 128m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14147"></path><path d="M587.2 130.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14148"></path><path d="M602 133.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14149"></path><path d="M616.7 137.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14150"></path><path d="M631.3 142.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14151"></path><path d="M645.7 147m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14152"></path><path d="M659.9 152.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14153"></path><path d="M673.8 158.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14154"></path><path d="M687.5 165.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14155"></path><path d="M700.9 172.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14156"></path><path d="M714 239.9c33 0 60-27 60-60s-27-60-60-60-60 27-60 60c0 33.1 27 60 60 60z" fill="#9aa0a6" p-id="14157"></path><path d="M723.6 185.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14158"></path><path d="M732.8 192.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14159"></path><path d="M742 198.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14160"></path><path d="M750.9 205.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14161"></path><path d="M759.7 212.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14162"></path><path d="M768.2 219.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14163"></path><path d="M776.5 227.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14164"></path><path d="M784.6 235m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14165"></path><path d="M792.5 243m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14166"></path><path d="M800.2 251.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14167"></path><path d="M807.6 259.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14168"></path><path d="M814.8 268.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14169"></path><path d="M821.7 277.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14170"></path><path d="M828.3 286.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14171"></path><path d="M834.7 295.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14172"></path><path d="M840.8 304.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14173"></path><path d="M846.8 314.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14174"></path><path d="M852.3 324m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14175"></path><path d="M857.6 333.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14176"></path><path d="M862.6 344m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14177"></path><path d="M867.3 354.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14178"></path><path d="M871.7 364.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14179"></path><path d="M875.8 374.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14180"></path><path d="M879.6 385.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14181"></path><path d="M883.1 396.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14182"></path><path d="M886.2 406.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14183"></path><path d="M889.2 417.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14184"></path><path d="M891.6 428.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14185"></path><path d="M894 439.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14186"></path><path d="M895.8 450.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14187"></path><path d="M897.4 461.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14188"></path><path d="M898.8 472.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14189"></path><path d="M899.6 484.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14190"></path><path d="M900.4 495.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14191"></path><path d="M900.6 506.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14192"></path><path d="M900.6 517.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14193"></path><path d="M900.4 529m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14194"></path><path d="M899.6 540.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14195"></path><path d="M898.7 551.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14196"></path><path d="M897.4 562.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14197"></path><path d="M895.8 573.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14198"></path><path d="M893.9 584.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14199"></path><path d="M891.6 595.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14200"></path><path d="M889.1 606.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14201"></path><path d="M886.2 617.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14202"></path><path d="M883 628.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14203"></path><path d="M879.6 638.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14204"></path><path d="M875.7 649.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14205"></path><path d="M871.6 659.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14206"></path><path d="M867.2 670.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14207"></path><path d="M862.5 680.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14208"></path><path d="M857.5 690.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14209"></path><path d="M852.2 700.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14210"></path><path d="M846.7 710m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14211"></path><path d="M840.7 719.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14212"></path><path d="M834.6 728.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14213"></path><path d="M828.2 738.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14214"></path><path d="M821.5 747.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14215"></path><path d="M814.7 756m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14216"></path><path d="M807.4 764.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14217"></path><path d="M800.1 773m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14218"></path><path d="M792.3 781.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14219"></path><path d="M784.5 784.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14220"></path><path d="M776.6 776.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14221"></path><path d="M768.7 768.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14222"></path><path d="M760.7 760.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14223"></path><path d="M752.8 752.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14224"></path><path d="M744.9 744.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14225"></path><path d="M736.9 736.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14226"></path><path d="M729 729m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14227"></path><path d="M721.1 721.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14228"></path><path d="M713.1 713.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14229"></path><path d="M705.2 705.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14230"></path><path d="M697.3 697.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14231"></path><path d="M689.3 694.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14232"></path><path d="M690.9 702m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14233"></path><path d="M698.8 709.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14234"></path><path d="M706.8 717.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14235"></path><path d="M714.7 725.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14236"></path><path d="M722.6 733.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14237"></path><path d="M730.6 741.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14238"></path><path d="M738.5 749.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14239"></path><path d="M746.4 757.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14240"></path><path d="M754.4 765.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14241"></path><path d="M762.3 773.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14242"></path><path d="M770.2 781.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14243"></path><path d="M778.2 789.3m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14244"></path><path d="M786.1 797.2m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14245"></path><path d="M794 805.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14246"></path><path d="M802 813.1m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14247"></path><path d="M809.9 821m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14248"></path><path d="M817.8 828.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14249"></path><path d="M825.8 836.9m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14250"></path><path d="M833.7 844.8m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14251"></path><path d="M841.6 852.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14252"></path><path d="M849.6 860.7m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14253"></path><path d="M857.5 868.6m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14254"></path><path d="M865.4 876.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14255"></path><path d="M873.4 884.5m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14256"></path><path d="M881.3 892.4m-60 0a60 60 0 1 0 120 0 60 60 0 1 0-120 0Z" fill="#9aa0a6" p-id="14257"></path><path d="M889.1 960.2c33 0 60-27 60-60s-27-60-60-60-60 27-60 60 26.9 60 60 60z" fill="#9aa0a6" p-id="14258"></path></svg>`;
        QYLToolBar.ariaLabel = "QYL主题设置";
        QYLToolBar.style.userSelect= 'none';
        var parentElement = toolbarVIP ? toolbarVIP.parentElement : (windowControls ? windowControls.parentElement : document.body);
        if (!parentElement) {
            document.body.classList.add("QYLmobile");
            return;
        }
        parentElement.insertBefore(QYLToolBar, toolbarVIP || windowControls);
        QYLToolBar.addEventListener("click", function() {
            var settingsWindow = document.getElementById('settings-window');
            if (settingsWindow) {
                closeSettingsWindow();
            } else {
                createSettingsWindow();
            }
        });
    }
}

// 设置窗口

let isChecked1 = false;
let isChecked2 = false;
let isChecked3 = false;
let isChecked4 = false;
let isChecked5 = false;
let isChecked6 = false;
let isChecked7 = false;
let isChecked9 = false;
let isChecked10 = false;
let isChecked11 = false;

function createSettingsWindow() {
    // 检查是否已经存在设置窗口
    if (document.getElementById('settings-window')) return;

    // 创建设置窗口
    const settingsWindow = document.createElement('div');
    settingsWindow.id = 'settings-window';
    settingsWindow.style.position = 'fixed';
    settingsWindow.style.top = '32px'; 
    settingsWindow.style.right = '195px'; 
    settingsWindow.style.backgroundColor = 'var(--QYL-filter-background-forQsettings)';
    settingsWindow.style.backdropFilter = 'var(--QYL-filter-forQsettings)';
    settingsWindow.style.padding = '12px';
    settingsWindow.style.boxShadow = 'var(--b3-point-shadow)';
    settingsWindow.style.zIndex = '1000';
    settingsWindow.style.borderRadius = '16px'; 
    settingsWindow.style.animation = 'QYLpopout 0.2s forwards'; 

    // 创建复选框和标签
    const checkbox1 = document.createElement('input');
    checkbox1.type = 'checkbox';
    checkbox1.id = 'mark-empty-checkbox';
    checkbox1.checked = isChecked1;

    const label1 = document.createElement('label');
    label1.htmlFor = 'mark-empty-checkbox';
    label1.textContent = ' 标记挖空';
    label1.style.fontSize = '14px';
    label1.style.userSelect= 'none';

    const checkbox2 = document.createElement('input');
    checkbox2.type = 'checkbox';
    checkbox2.id = 'filetree-indent-checkbox';
    checkbox2.checked = isChecked2;

    const label2 = document.createElement('label');
    label2.htmlFor = 'filetree-indent-checkbox';
    label2.textContent = ' 文档树缩进线';
    label2.style.fontSize = '14px';
    label2.style.userSelect= 'none';

    const checkbox3 = document.createElement('input');
    checkbox3.type = 'checkbox';
    checkbox3.id = 'toolbar-hidden-checkbox';
    checkbox3.checked = isChecked3;

    const label3 = document.createElement('label');
    label3.htmlFor = 'toolbar-hidden-checkbox';
    label3.textContent = ' 隐藏顶栏';
    label3.style.fontSize = '14px';
    label3.style.userSelect= 'none';

    const checkbox4 = document.createElement('input');
    checkbox4.type = 'checkbox';
    checkbox4.id = 'hoverblock-remind-checkbox';
    checkbox4.checked = isChecked4;

    const label4 = document.createElement('label');
    label4.htmlFor = 'hoverblock-remind-checkbox';
    label4.textContent = ' 鼠标所在块高亮提示';
    label4.style.fontSize = '14px';
    label4.style.userSelect= 'none';

    const checkbox5 = document.createElement('input');
    checkbox5.type = 'checkbox';
    checkbox5.id = 'sbblock-remind-checkbox';
    checkbox5.checked = isChecked5;

    const label5 = document.createElement('label');
    label5.htmlFor = 'sbblock-remind-checkbox';
    label5.textContent = ' 鼠标所在超级块范围提示';
    label5.style.fontSize = '14px';
    label5.style.userSelect= 'none';

    const checkbox6 = document.createElement('input');
    checkbox6.type = 'checkbox';
    checkbox6.id = 'fullwidthpage-checkbox';
    checkbox6.checked = isChecked6;

    const label6 = document.createElement('label');
    label6.htmlFor = 'fullwidthpage-checkbox';
    label6.textContent = ' 编辑器全宽显示';
    label6.style.fontSize = '14px';
    label6.style.userSelect= 'none';

    const checkbox7 = document.createElement('input');
    checkbox7.type = 'checkbox';
    checkbox7.id = 'colorfulfiletree-checkbox';
    checkbox7.checked = isChecked7;

    const label7 = document.createElement('label');
    label7.htmlFor = 'colorfulfiletree-checkbox';
    label7.textContent = ' 多彩文档树';
    label7.style.fontSize = '14px';
    label7.style.userSelect= 'none';

    const checkbox9 = document.createElement('input');
    checkbox9.type = 'checkbox';
    checkbox9.id = 'QYLanimation-checkbox';
    checkbox9.checked = isChecked9;

    const label9 = document.createElement('label');
    label9.htmlFor = 'QYLanimation-checkbox';
    label9.textContent = ' 关闭主题动画';
    label9.style.fontSize = '14px';
    label9.style.userSelect= 'none';

    const checkbox10 = document.createElement('input');
    checkbox10.type = 'checkbox';
    checkbox10.id = 'QYLAero-checkbox';
    checkbox10.checked = isChecked10;

    const label10 = document.createElement('label');
    label10.htmlFor = 'QYLAero-checkbox';
    label10.textContent = ' 毛玻璃效果';
    label10.style.fontSize = '14px';
    label10.style.userSelect= 'none';

    const checkbox11 = document.createElement('input');
    checkbox11.type = 'checkbox';
    checkbox11.id = 'QYLbancolofultag-checkbox';
    checkbox11.checked = isChecked11;

    const label11 = document.createElement('label');
    label11.htmlFor = 'QYLbancolofultag-checkbox';
    label11.textContent = ' 关闭多彩标签和多彩行级代码';
    label11.style.fontSize = '14px';
    label11.style.userSelect= 'none';

    // 将复选框和标签组合
    const QYLfunctionpair1 = document.createElement('div');
    QYLfunctionpair1.className = 'checkbox-label-pair';
    QYLfunctionpair1.appendChild(checkbox1);
    QYLfunctionpair1.appendChild(label1);

    const QYLfunctionpair2 = document.createElement('div');
    QYLfunctionpair2.className = 'checkbox-label-pair';
    QYLfunctionpair2.appendChild(checkbox2);
    QYLfunctionpair2.appendChild(label2);

    const QYLfunctionpair3 = document.createElement('div');
    QYLfunctionpair3.className = 'checkbox-label-pair';
    QYLfunctionpair3.appendChild(checkbox3);
    QYLfunctionpair3.appendChild(label3);

    const QYLfunctionpair4 = document.createElement('div');
    QYLfunctionpair4.className = 'checkbox-label-pair';
    QYLfunctionpair4.appendChild(checkbox4);
    QYLfunctionpair4.appendChild(label4);

    const QYLfunctionpair5 = document.createElement('div');
    QYLfunctionpair5.className = 'checkbox-label-pair';
    QYLfunctionpair5.appendChild(checkbox5);
    QYLfunctionpair5.appendChild(label5);
    
    const QYLfunctionpair6 = document.createElement('div');
    QYLfunctionpair6.className = 'checkbox-label-pair';
    QYLfunctionpair6.appendChild(checkbox6);
    QYLfunctionpair6.appendChild(label6);

    const QYLfunctionpair7 = document.createElement('div');
    QYLfunctionpair7.className = 'checkbox-label-pair';
    QYLfunctionpair7.appendChild(checkbox7);
    QYLfunctionpair7.appendChild(label7);

    const QYLfunctionpair9 = document.createElement('div');
    QYLfunctionpair9.className = 'checkbox-label-pair';
    QYLfunctionpair9.appendChild(checkbox9);
    QYLfunctionpair9.appendChild(label9);

    const QYLfunctionpair10 = document.createElement('div');
    QYLfunctionpair10.className = 'checkbox-label-pair';
    QYLfunctionpair10.appendChild(checkbox10);
    QYLfunctionpair10.appendChild(label10);

    const QYLfunctionpair11 = document.createElement('div');
    QYLfunctionpair11.className = 'checkbox-label-pair';
    QYLfunctionpair11.appendChild(checkbox11);
    QYLfunctionpair11.appendChild(label11);

    // 将复选框和标签添加到设置窗口
    settingsWindow.appendChild(QYLfunctionpair1);
    settingsWindow.appendChild(QYLfunctionpair2);
    settingsWindow.appendChild(QYLfunctionpair3);
    settingsWindow.appendChild(QYLfunctionpair4);
    settingsWindow.appendChild(QYLfunctionpair5);
    settingsWindow.appendChild(QYLfunctionpair6);
    settingsWindow.appendChild(QYLfunctionpair7);
    settingsWindow.appendChild(QYLfunctionpair9);
    settingsWindow.appendChild(QYLfunctionpair10);
    settingsWindow.appendChild(QYLfunctionpair11);

    // 将设置窗口添加到body
    document.body.appendChild(settingsWindow);

    // 标记挖空开关
    checkbox1.addEventListener('change', function() {
        isChecked1 = this.checked;
        if (this.checked) {
            enableMarkStyles();
        } else {
            disableMarkStyles();
        }
    });

    // 文档树缩进线开关
    checkbox2.addEventListener('change', function() {
        isChecked2 = this.checked;
        if (this.checked) {
            enableIndentStyle();
        } else {
            disableIndentStyle();
        }
    });

    // 隐藏顶栏开关
    checkbox3.addEventListener('change', function() {
        isChecked3 = this.checked;
        if (this.checked) {
            enabletoolbarhidden();
        } else {
            disabletoolbarhidden();
        }
    });

    // 鼠标所在块高亮开关
    checkbox4.addEventListener('change', function() {
        isChecked4 = this.checked;
        if (this.checked) {
            enablehoverblockremind();
        } else {
            disablehoverblockremind();
        }
    });

    // 超级块范围提示开关
    checkbox5.addEventListener('change', function() {
        isChecked5 = this.checked;
        if (this.checked) {
            enablesbremind();
        } else {
            disablesbremind();
        }
    });

    // 全宽显示开关
    checkbox6.addEventListener('change', function() {
        isChecked6 = this.checked;
        if (this.checked) {
            enablefullwidth();
        } else {
            disablefullwidth();
        }
    });

    // 多彩文档树开关
    checkbox7.addEventListener('change', function() {
        isChecked7 = this.checked;
        if (this.checked) {
            enablecolorfulfiletree();
        } else {
            disablecolorfulfiletree();
        }
    });

    // 关闭主题动画开关
    checkbox9.addEventListener('change', function() {
        isChecked9 = this.checked;
        if (this.checked) {
            enablecancleQYLanimation();
        } else {
            disablecancleQYLanimation();
        }
    });

    // 毛玻璃效果开关
    checkbox10.addEventListener('change', function() {
        isChecked10 = this.checked;
        if (this.checked) {
            enableQYLAero();
        } else {
            disableQYLAreo();
        }
    });

    // 关闭多彩标签和多彩行级代码开关
    checkbox11.addEventListener('change', function() {
        isChecked11 = this.checked;
        if (this.checked) {
            enablecancleQYLcolorfultag();
        } else {
            disablecancleQYLcolorfultag();
        }
    });

    // ESC键关闭
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeSettingsWindow();
        }
    });
    // 阻止点击事件冒泡
    settingsWindow.addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

 // 点击空白处关闭设置窗口
document.addEventListener('click', function(event) {
    var targetElement = event.target; // clicked element
    var settingsWindow = document.getElementById('settingsWindow');
    var qToolbar = document.getElementById('QToolbar');
    do {
        if (targetElement == settingsWindow || targetElement == qToolbar) {
            return;
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);
    closeSettingsWindow();
});

// 关闭设置窗口
function closeSettingsWindow() {
    const settingsWindow = document.getElementById('settings-window');
    if (settingsWindow) {
        document.body.removeChild(settingsWindow);
    }
}

// 开启标记挖空功能
function enableMarkStyles() {
    let styleSheet = document.getElementById("mark-styles");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "mark-styles";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        span[data-type~=mark],mark {
            background: transparent !important; }
        .b3-typography mark, .b3-typography span[data-type~=mark], 
        .protyle-wysiwyg mark, .protyle-wysiwyg span[data-type~=mark] {
            color: transparent !important; 
            border-bottom: 1.5px solid rgba(60, 172, 78, 0.8);
            background-color: transparent !important;
            margin-left: 3px;
            margin-right: 3px;
            padding-bottom: 3px;
        }
        .b3-typography mark:hover, .b3-typography span[data-type~=mark]:hover, 
        .protyle-wysiwyg mark:hover, .protyle-wysiwyg span[data-type~=mark]:hover {
            color: inherit !important;
            border-bottom: 1.5px solid rgba(60, 172, 78, 0.8);
            background-color: transparent !important;
            margin-left: 3px;
            margin-right: 3px;
            padding-bottom: 3px;
        }
        .card__block--hidemark span[data-type~=mark]::before {
            content: "________";
            visibility: hidden;
            white-space: nowrap;
        }
    `;
}
// 关闭标记挖空功能
function disableMarkStyles() {
    const styleSheet = document.getElementById("mark-styles");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启文档树缩进线功能
function enableIndentStyle() {
    let styleSheet = document.getElementById("indent-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "indent-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
:root {
    --filetree-line-1: rgba(208, 208, 208, 0.5);
    --filetree-line-2: rgba(208, 208, 208, 0.5);
    --filetree-line-3: rgba(208, 208, 208, 0.5);
    --filetree-line-4: rgba(208, 208, 208, 0.5);
    --filetree-line-5: rgba(208, 208, 208, 0.5);
    --filetree-line-6: rgba(208, 208, 208, 0.5);
    --filetree-line-7: rgba(208, 208, 208, 0.5);
    --filetree-line-8: rgba(208, 208, 208, 0.5);
}
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--filetree-line-1) 20px 21px, rgba(0, 0, 0, 0) 21px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--filetree-line-2) 20px 21px, rgba(0, 0, 0, 0) 21px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--filetree-line-3) 20px 21px, rgba(0, 0, 0, 0) 21px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--filetree-line-4) 20px 21px, rgba(0, 0, 0, 0) 21px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--filetree-line-5) 20px 21px, rgba(0, 0, 0, 0) 21px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--filetree-line-6) 20px 21px, rgba(0, 0, 0, 0) 21px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--filetree-line-7) 20px 21px, rgba(0, 0, 0, 0) 21px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 20px, var(--filetree-line-8) 20px 21px, rgba(0, 0, 0, 0) 21px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--filetree-line-1) 34px 35px, rgba(0, 0, 0, 0) 35px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--filetree-line-2) 34px 35px, rgba(0, 0, 0, 0) 35px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--filetree-line-3) 34px 35px, rgba(0, 0, 0, 0) 35px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--filetree-line-4) 34px 35px, rgba(0, 0, 0, 0) 35px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--filetree-line-5) 34px 35px, rgba(0, 0, 0, 0) 35px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--filetree-line-6) 34px 35px, rgba(0, 0, 0, 0) 35px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--filetree-line-7) 34px 35px, rgba(0, 0, 0, 0) 35px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 34px, var(--filetree-line-8) 34px 35px, rgba(0, 0, 0, 0) 35px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--filetree-line-1) 52px 53px, rgba(0, 0, 0, 0) 53px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--filetree-line-2) 52px 53px, rgba(0, 0, 0, 0) 53px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--filetree-line-3) 52px 53px, rgba(0, 0, 0, 0) 53px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--filetree-line-4) 52px 53px, rgba(0, 0, 0, 0) 53px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--filetree-line-5) 52px 53px, rgba(0, 0, 0, 0) 53px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--filetree-line-6) 52px 53px, rgba(0, 0, 0, 0) 53px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--filetree-line-7) 52px 53px, rgba(0, 0, 0, 0) 53px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 52px, var(--filetree-line-8) 52px 53px, rgba(0, 0, 0, 0) 53px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--filetree-line-1) 70px 71px, rgba(0, 0, 0, 0) 71px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--filetree-line-2) 70px 71px, rgba(0, 0, 0, 0) 71px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--filetree-line-3) 70px 71px, rgba(0, 0, 0, 0) 71px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--filetree-line-4) 70px 71px, rgba(0, 0, 0, 0) 71px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--filetree-line-5) 70px 71px, rgba(0, 0, 0, 0) 71px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--filetree-line-6) 70px 71px, rgba(0, 0, 0, 0) 71px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--filetree-line-7) 70px 71px, rgba(0, 0, 0, 0) 71px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 70px, var(--filetree-line-8) 70px 71px, rgba(0, 0, 0, 0) 71px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--filetree-line-1) 88px 89px, rgba(0, 0, 0, 0) 89px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--filetree-line-2) 88px 89px, rgba(0, 0, 0, 0) 89px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--filetree-line-3) 88px 89px, rgba(0, 0, 0, 0) 89px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--filetree-line-4) 88px 89px, rgba(0, 0, 0, 0) 89px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--filetree-line-5) 88px 89px, rgba(0, 0, 0, 0) 89px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--filetree-line-6) 88px 89px, rgba(0, 0, 0, 0) 89px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--filetree-line-7) 88px 89px, rgba(0, 0, 0, 0) 89px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 88px, var(--filetree-line-8) 88px 89px, rgba(0, 0, 0, 0) 89px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--filetree-line-1) 106px 107px, rgba(0, 0, 0, 0) 107px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--filetree-line-2) 106px 107px, rgba(0, 0, 0, 0) 107px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--filetree-line-3) 106px 107px, rgba(0, 0, 0, 0) 107px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--filetree-line-4) 106px 107px, rgba(0, 0, 0, 0) 107px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--filetree-line-5) 106px 107px, rgba(0, 0, 0, 0) 107px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--filetree-line-6) 106px 107px, rgba(0, 0, 0, 0) 107px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--filetree-line-7) 106px 107px, rgba(0, 0, 0, 0) 107px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 106px, var(--filetree-line-8) 106px 107px, rgba(0, 0, 0, 0) 107px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+1)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--filetree-line-1) 124px 125px, rgba(0, 0, 0, 0) 125px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+2)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--filetree-line-2) 124px 125px, rgba(0, 0, 0, 0) 125px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+3)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--filetree-line-3) 124px 125px, rgba(0, 0, 0, 0) 125px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+4)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--filetree-line-4) 124px 125px, rgba(0, 0, 0, 0) 125px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+5)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--filetree-line-5) 124px 125px, rgba(0, 0, 0, 0) 125px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+6)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--filetree-line-6) 124px 125px, rgba(0, 0, 0, 0) 125px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n+7)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--filetree-line-7) 124px 125px, rgba(0, 0, 0, 0) 125px 100%) }
.file-tree>.fn__flex-1>ul:nth-of-type(8n)>ul>ul>ul>ul>ul>ul>ul { background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0 124px, var(--filetree-line-8) 124px 125px, rgba(0, 0, 0, 0) 125px 100%) }
    `;
}

// 关闭文档树缩进功能
function disableIndentStyle() {
    const styleSheet = document.getElementById("indent-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启隐藏顶栏功能
function enabletoolbarhidden() {
    let styleSheet = document.getElementById("toolbarhidden-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "toolbarhidden-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        .toolbar {
            margin-bottom: -32px;
            opacity: 0;
            transition: all 200ms;
            transform: translateY(-30px);
            z-index: 8;
            border-bottom-right-radius: var(--b3-border-radius);
            border-bottom-left-radius: var(--b3-border-radius);
            box-shadow: var(--b3-point-shadow);
        }
        .toolbar:hover {
            opacity: 1;
            transform: translateY(0px);
            transition: all 200ms;
        }
    `;
}

// 关闭隐藏顶栏功能
function disabletoolbarhidden() {
    const styleSheet = document.getElementById("toolbarhidden-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启鼠标所在块高亮功能
function enablehoverblockremind() {
    let styleSheet = document.getElementById("hoverblock-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "hoverblock-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        .p:hover {
            box-shadow: 2px 2px 6px rgba(255, 255, 255, 0.15), -2px -2px 6px rgba(255, 255, 255, 0.15), 0 0 12px rgba(255, 255, 255, 0.1) !important;
            transition: 0.3s !important;
        }
    `;
}

// 关闭鼠标所在块高亮功能
function disablehoverblockremind() {
    const styleSheet = document.getElementById("hoverblock-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启超级块范围提示功能
function enablesbremind() {
    let styleSheet = document.getElementById("sbremind-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "sbremind-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        .sb:hover {
            box-shadow: 2px 2px 6px rgba(255, 255, 255, 0.15), -2px -2px 6px rgba(255, 255, 255, 0.15), 0 0 12px rgba(255, 255, 255, 0.1) !important;
            transition: 0.3s !important;
        }
    `;
}

// 关闭超级块范围提示功能
function disablesbremind() {
    const styleSheet = document.getElementById("sbremind-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启全宽显示功能
function enablefullwidth() {
    let styleSheet = document.getElementById("fullwidth-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "fullwidth-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        .protyle-wysiwyg {
            padding-left: 20px !important;
            padding-right: 20px !important;
        }
        .protyle-title.protyle-wysiwyg--attr {
            margin-left: 20px !important;
            margin-right:20px !important;
        }
        @keyframes QYLbounceLeftspecial {
            0% {
                transform: translateX(100%);
            }
            30% {
                transform: translateX(-10%);
            }
            70% {
                transform: translateX(5%);
            }
            100% {
                transform: translateX(0);
            }
        }
        .protyle-background__icon, .protyle-background__icon img, .protyle-background__icon svg, .b3-chips__doctag .b3-chip {
            position: relative;
            left: -76px;
            animation: QYLbounceLeftspecial 0.3s forwards;
        }
    `;
}

// 关闭全宽显示功能
function disablefullwidth() {
    const styleSheet = document.getElementById("fullwidth-style");
    if (styleSheet) {
        styleSheet.innerText = `
            @keyframes QYLbounceRightspecial {
                    0% {
                        transform: translateX(-100%);
                    }
                    30% {
                        transform: translateX(10%);
                    }
                    70% {
                        transform: translateX(-5%);
                    }
                    100% {
                        transform: translateX(0);
                    }
            }
            .protyle-background__icon, .protyle-background__icon img, .protyle-background__icon svg, .b3-chips__doctag .b3-chip {
                animation: QYLbounceRightspecial 0.3s forwards;
            }
    `;
    }
}

// 开启多彩文档树功能
function enablecolorfulfiletree() {
    let styleSheet = document.getElementById("colorfulfiletree-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "colorfulfiletree-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
:root {
    --filetree-line-1: rgba(84, 115, 207, 0.5);
    --filetree-line-2: rgba(190, 139, 57, 0.5);
    --filetree-line-3: rgba(194, 75, 75, 0.5);
    --filetree-line-4: rgba(64, 185, 76, 0.5);
    --filetree-line-5: rgba(156, 76, 187, 0.5);
    --filetree-line-6: rgba(49, 147, 131, 0.5);
    --filetree-line-7: rgba(171, 64, 166, 0.5);
    --filetree-line-8: rgba(169, 96, 65, 0.5);
}
        .fn__flex-1.fn__flex-column.file-tree.sy__file ul.b3-list.b3-list--background { margin-left: 20px; }
        [data-type="navigation-root"]::before {
            content: "";
            width: 12px;
            height: 28px;
            position: absolute;
            left: -20px;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }
        .b3-list:nth-of-type(8n+1)>[data-type="navigation-root"]::before {
            background-color: #3573f0 !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+1) {
            border-left: 3px solid #3573f0;
        }
        .b3-list:nth-of-type(8n+1)>[data-type="navigation-root"] {
            background-color:rgba(53, 115, 240, 0.5) !important;
        }
        .b3-list:nth-of-type(8n+2)>[data-type="navigation-root"]::before {
            background-color:rgb(220, 172, 14) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+2) {
            border-left: 3px solid rgb(220, 172, 14);
        }
        .b3-list:nth-of-type(8n+2)>[data-type="navigation-root"] {
            background-color: rgba(220, 172, 14, 0.5) !important;
        }
        .b3-list:nth-of-type(8n+3)>[data-type="navigation-root"]::before {
            background-color:rgb(211, 70, 54) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+3) {
            border-left: 3px solid rgb(211, 70, 54);
        }
        .b3-list:nth-of-type(8n+3)>[data-type="navigation-root"] {
            background-color: rgba(211, 70, 54, 0.5) !important;
        }
        .b3-list:nth-of-type(8n+4)>[data-type="navigation-root"]::before {
            background-color:rgb(80, 159, 60) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+4) {
            border-left: 3px solid rgb(80, 159, 60);
        }
        .b3-list:nth-of-type(8n+4)>[data-type="navigation-root"] {
            background-color: rgba(80, 159, 60, 0.5) !important;
        }
        .b3-list:nth-of-type(8n+5)>[data-type="navigation-root"]::before {
            background-color:rgb(154, 75, 183) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+5) {
            border-left: 3px solid rgb(154, 75, 183);
        }
        .b3-list:nth-of-type(8n+5)>[data-type="navigation-root"] {
            background-color: rgba(157, 103, 177, 0.5)!important;
        }
        .b3-list:nth-of-type(8n+6)>[data-type="navigation-root"]::before {
            background-color:rgb(33, 152, 145) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+6) {
            border-left: 3px solid rgb(33, 152, 145);
        }
        .b3-list:nth-of-type(8n+6)>[data-type="navigation-root"] {
            background-color: rgba(33, 152, 144, 0.5) !important;
        }
        .b3-list:nth-of-type(8n+7)>[data-type="navigation-root"]::before {
            background-color:rgb(180, 42, 115) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n+7) {
            border-left: 3px solid rgb(180, 42, 115);
        }
        .b3-list:nth-of-type(8n+7)>[data-type="navigation-root"] {
            background-color: rgba(180, 42, 116, 0.5) !important;
        }
        .b3-list:nth-of-type(8n)>[data-type="navigation-root"]::before {
            background-color:rgb(176, 95, 28) !important;
        }
        div.sy__file ul:not(ul ul):not(ul.b3-list.fn__flex-column):nth-of-type(8n) {
            border-left: 3px solid rgb(176, 95, 28);
        }
        .b3-list:nth-of-type(8n)>[data-type="navigation-root"] {
            background-color:rgba(176, 95, 28, 0.5) !important;
        }
    `;
}

// 关闭多彩文档树功能
function disablecolorfulfiletree() {
    const styleSheet = document.getElementById("colorfulfiletree-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 关闭主题动画
function enablecancleQYLanimation() {
    let styleSheet = document.getElementById("QYLanimation-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLanimation-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        :root {
            --b3-transition: all .2s cubic-bezier(0, 0, .2, 1) 0ms;
            --b3-width-transition: width .2s cubic-bezier(0, 0, .2, 1) 0ms;
            --b3-color-transition: color .2s cubic-bezier(0, 0, .2, 1) 0ms;
            --b3-background-transition: background 20ms ease-in 0s;
        }
        @keyframes QYLpopout {}
        @keyframes QYLpopout2 {}
        @keyframes QYLpopout3 {}
        @keyframes QYLbounceRight {}
        @keyframes QYLbounceRight2 {}
    `;
}

// 取消关闭主题动画
function disablecancleQYLanimation() {
    const styleSheet = document.getElementById("QYLanimation-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 开启毛玻璃效果
function enableQYLAero() {
    let styleSheet = document.getElementById("QYLAero-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLAero-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        .b3-menu, .b3-menu__item--show>.b3-menu__submenu {
            animation: none;
        }
        /* 毛玻璃效果 */
        :root {
            --QYL-filter1: blur(10px);
            --QYL-filter2: blur(16px);
            --QYL-filter-background1: rgba(20, 20, 20, 0.5);
            --QYL-filter-background2: rgba(20, 20, 20, 0.7);
            --QYL-filter-background-fix: rgba(20, 20, 20, 0.9);
            --QYL-filter-background-forQsettings: rgba(20, 20, 20, 0.7);
            --QYL-filter-forQsettings: blur(16px);
        }
        /* 斜杠菜单毛玻璃 */
        .protyle-hint.hint--menu {
            background-color: var(--QYL-filter-background1) !important;
            backdrop-filter: var(--QYL-filter1) !important;
            border: none;
        }
        /* 编辑器工具栏毛玻璃 */
        .protyle-toolbar, .protyle-util, .protyle-hint {
            background-color: var(--QYL-filter-background1) !important;
            backdrop-filter: var(--QYL-filter1) !important;
            border: none;
        }
        /* 底部状态栏毛玻璃 */
        @media (min-width: 768px) {
            #status {
                background-color: var(--QYL-filter-background1) !important;
                backdrop-filter: var(--QYL-filter1) !important;
                border: none;
            }
        }
        /* 提示气泡毛玻璃 */
        #tooltip {
            background-color: var(--QYL-filter-background1) !important;
            backdrop-filter: var(--QYL-filter1) !important;
            color: var(--b3-theme-on-background);
            box-shadow: var(--b3-light-shadow);
        }
        .b3-tooltips::before {
            display: none !important;
        }
        .b3-tooltips::after {
            background-color: var(--QYL-filter-background1) !important;
            backdrop-filter: var(--QYL-filter1) !important;
            color: var(--b3-theme-on-background);
            box-shadow: var(--b3-light-shadow);
        }
        /* 修复编辑器工具栏提示气泡 */
        .protyle-toolbar .b3-tooltips::after {
            background-color: var(--QYL-filter-background-fix) !important;
        }
        /* 行内备注输入框毛玻璃 */
        .block__icons.block__icons--menu.fn__flex {
            background-color: var(--QYL-filter-background1) !important;
            backdrop-filter: var(--QYL-filter1) !important;
        }
        .block__icons.block__icons--menu.fn__flex + .b3-text-field.b3-text-field--text.fn__block {
            background-color: var(--QYL-filter-background1) !important;
            backdrop-filter: var(--QYL-filter1) !important;
        }
        /* 右上角消息框毛玻璃 */
        .b3-snackbar__content {
            background-color: var(--QYL-filter-background1) !important;
            backdrop-filter: var(--QYL-filter1) !important;
            color: var(--b3-theme-on-background)
        }
        /* 题头图设置毛玻璃 */
        .protyle-background__img .protyle-icon {
            background-color: var(--QYL-filter-background2) !important;
            backdrop-filter: var(--QYL-filter2  ) !important;
            color: var(--b3-theme-on-background);
        }
        /* 菜单毛玻璃 */
        .b3-menu, .b3-menu__submenu {
            background-color: var(--QYL-filter-background2) !important;
            border: none !important;
        }
        .b3-menu::before {
            border-radius: var(--b3-border-radius);
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            backdrop-filter: var(--QYL-filter2) !important;
        }
        .b3-menu .b3-menu__items, .b3-menu .b3-menu__items * {
            background-color: rgba(255, 0, 0, 0);
        }
        .b3-menu__submenu::before {
            border-radius: var(--b3-border-radius);
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            backdrop-filter: var(--QYL-filter2  ) !important;
        }
        .b3-menu__item--current:not(.b3-menu__item--readonly):hover {
            background-color: var(--hovercurrent);
        }
        /* 弹出框侧栏毛玻璃 */
        .b3-dialog__container {
            background-color: var(--QYL-filter-background2) !important;
            border: none !important;
        }
        .b3-dialog__container::before {
            border-radius: var(--b3-border-radius);
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            backdrop-filter: var(--QYL-filter2) !important;
            z-index: -5;
        }
        /* 修复PDF搜索栏 */
        #outerContainer #mainContainer .findbar.b3-menu.doorHanger.wrapContainers * {
            z-index: 1 !important;
        }
        /* 修复PDF标注颜色栏不能显示 */
        #outerContainer > div.pdf__util.b3-menu .fn__flex button {
            z-index: 1 !important;
        }
        .pdf__outer.sidebarOpen .pdf__util.b3-menu > button {
            background-color: rgba(255, 0, 0, 0);
        }
        .pdf__outer.sidebarOpen .pdf__util.b3-menu > button:hover {
            background-color: var(--hovercurrent);
        }     
        /* 修复PDF菜单没有悬浮色 */   
        #secondaryToolbarButtonContainer button:hover {
            background-color: var(--hovercurrent);
        }
        /* 设置页毛玻璃 */
        :root {
            --QYLAero-label-background: rgba(54, 54, 54, 0.2);
            --QYLAero-label-background2: rgba(54, 54, 54, 0.4);
            --QYLAero-input-background: rgb(43, 43, 43);
            --QYLAero-input-hover-background: rgb(186, 186, 186);
            --QYLAero-input-focus-background: rgb(82, 118, 236);
        }
        div[data-key="dialog-setting"] .config__tab-wrap {
            background-color: rgba(255, 0, 0, 0);
        }
        div[data-key="dialog-setting"] .fn__flex.b3-label, div[data-key="dialog-setting"] .b3-label {
            margin-bottom: 5px !important;
            padding: 5px 10px !important;
            border-radius: var(--b3-border-radius);
            background-color: var(--QYLAero-label-background);
            box-shadow: none !important;
        }
        div[data-key="dialog-setting"] .layout-tab-bar.fn__flex {
            background-color: rgba(255, 0, 0, 0);
        }
        div[data-key="dialog-setting"] .b3-text-field.fn__block.b3-form__icon-input {
            background-color: rgba(255, 0, 0, 0);
            box-shadow: none;
            background-color: var(--QYLAero-label-background2);
        }
        div[data-key="dialog-setting"] :is(.b3-select, .b3-text-field) {
            background-color: rgba(255, 0, 0, 0);
            box-shadow: none;
            background-color: var(--QYLAero-input-background);
        }
        div[data-key="dialog-setting"] :is(.b3-select, .b3-text-field):hover {
            box-shadow: inset 0 0 0 1px var(--QYLAero-input-focus-background) !important;
        }
        div[data-key="dialog-setting"] span[style*="color:var(--b3-theme-background)"][style*="font-family: cursive"] {
            color: rgba(255, 0, 0, 0) !important;
        }
        .config__panel>.b3-tab-bar .config__tab-hr {
            margin: 8px 0px;
            background: transparent;
        }
        div[data-key="dialog-snippets"] .layout-tab-bar.fn__flex.fn__flex-shrink {
            background-color: rgba(255, 0, 0, 0);
        }
        .b3-text-field:not(.b3-text-field--text):hover {
            box-shadow: inset 0 0 0 1px var(--QYLAero-input-hover-background) !important;
            background-color: rgba(255, 0, 0, 0) !important;
        }
        .b3-text-field:not(.b3-text-field--text):focus {
            box-shadow: inset 0 0 0 1px var(--QYLAero-input-focus-background) !important;
            background-color: rgba(255, 0, 0, 0) !important;
        }

        /* 命令面板毛玻璃 */
        div[data-key="dialog-commandpanel"] .b3-dialog__body {
            background-color: rgba(255, 0, 0, 0);
        }
        div[data-key="dialog-commandpanel"] .b3-list.b3-list--background.search__list {
            background-color: rgba(255, 0, 0, 0);
        }
        div[data-key="dialog-commandpanel"] .search__header .b3-text-field--text {
            background-color: rgba(27, 152, 27, 0);
        }
        div[data-key="dialog-commandpanel"] .search__header {
            margin-left: 10px;
            margin-right: 10px;
            border-radius: var(--b3-border-radius);
            background-color: var(--QYLAero-label-background2) !important;
            border: none !important;
        }
        div[data-key="dialog-commandpanel"] .search__header:hover {
            box-shadow: inset 0 0 0 1px var(--QYLAero-input-hover-background) !important;
            background-color: rgba(255, 0, 0, 0) !important;
            transition: var(--b3-transition);
        }

        /* 搜索面板毛玻璃 */
        .b3-dialog__body .b3-form__icon.search__header .b3-text-field.b3-text-field--text {
            background-color: rgba(27, 152, 27, 0);
        }
        .b3-dialog__body .b3-form__icon.search__header {
            background-color: rgba(27, 152, 27, 0);
        }
        .b3-dialog__body .b3-form__icon.search__header:hover {
            box-shadow: inset 0 0 0 1px var(--QYLAero-input-hover-background) !important;
            background-color: rgba(255, 0, 0, 0) !important;
            transition: var(--b3-transition);
        }
        .b3-dialog__body .search__header {
            margin-left: 10px;
            margin-right: 10px;
            margin-top: 5px;
            border-radius: var(--b3-border-radius);
            background-color: var(--QYLAero-label-background) !important;
            border: none;
            background-color: rgba(27, 152, 27, 0);
        }
        .b3-dialog__body .fn__flex-1.search__list.b3-list.b3-list--background {
            border: none;
            margin: 5px 10px;
            border-radius: var(--b3-border-radius);
            padding: 5px;
            background-color: var(--QYLAero-label-background);
        }
        .b3-dialog__body .search__preview.protyle .protyle-breadcrumb {
            background-color: rgba(27, 152, 27, 0);
        }
        .b3-dialog__body .fn__flex-1.search__preview.b3-typography {
            border: none;
            margin: 5px 10px;
            border-radius: var(--b3-border-radius);
            padding: 5px;
            background-color: var(--QYLAero-label-background);
        }
        .b3-dialog__body .search__preview.protyle {
            border: none;
            margin: 5px 10px;
            border-radius: var(--b3-border-radius);
            padding: 5px;
            background-color: var(--QYLAero-label-background);
        }
        .b3-dialog__body .search__tip {
            border: none;
        }
        .search__layout--row {
            border: none;
        }
        /* 集市毛玻璃 */
        .config-bazaar__readme--show {
            background-color: var(--QYL-filter-background2) !important;
            backdrop-filter: var(--QYL-filter2  ) !important;
        }
        .config-bazaar__panel .b3-card {
            background-color: rgba(255, 0, 0, 0);
        }
        .config-bazaar__panel .b3-card:hover {
            background-color: var(--hovercurrent);
        }
        /* 闪卡毛玻璃 */
        div[data-key="dialog-viewcards"] .fn__flex-1.card__empty {
            background-color: rgba(255, 0, 0, 0);
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 10px;
            padding: 5px 20px;
            border-radius: var(--b3-border-radius);
            background-color: var(--QYLAero-label-background2) !important;
        }
        div[data-key="dialog-viewcards"] #cardPreview {
            background-color: rgba(255, 0, 0, 0);
            margin-left: 10px;
            margin-right: 10px;
            margin-bottom: 10px;
            padding: 5px 20px;
            border-radius: var(--b3-border-radius);
            background-color: var(--QYLAero-label-background2) !important;
        }
        div[data-key="dialog-viewcards"] #cardPreview .protyle-breadcrumb {
            background-color: rgba(255, 0, 0, 0);
        }
        div[data-key="dialog-opencard"] .b3-dialog__scrim {
            background-color: var(--QYL-filter-background2) !important;
            backdrop-filter: var(--QYL-filter2) !important;
        }
        /* 文档树/大纲取消钉住毛玻璃 */
        .layout--float {
            border: none !important;
            border-radius: var(--b3-border-radius) !important;
            background-color: var(--QYL-filter-background2) !important;
            backdrop-filter: var(--QYL-filter2) !important;
        }
        .layout--float .layout-tab-container.fn__flex-1 {
            background-color: rgba(255, 0, 0, 0) !important;
        }
        .layout--float .block__icons {
            background-color: rgba(255, 0, 0, 0) !important;
        }
        /* 关系图取消钉住毛玻璃 */
        .layout--float .fn__flex-1.graph.file-tree.sy__graph {
            background-color: rgba(255, 0, 0, 0) !important;
        }
        .layout--float .fn__flex-1.graph.file-tree.sy__graph .graph__svg {
            background-color: rgba(255, 0, 0, 0) !important;
        }
        .layout--float .fn__flex-1.graph.file-tree.sy__graph .graph__panel {
            background-color: var(--QYL-filter-background-fix) !important;
        }
        /* 全局关系图取消钉住毛玻璃 */
        .layout--float .fn__flex-1.graph.file-tree.sy__globalGraph {
            background-color: rgba(255, 0, 0, 0) !important;
        }
        .layout--float .fn__flex-1.graph.file-tree.sy__globalGraph .graph__svg {
            background-color: rgba(255, 0, 0, 0) !important;
        }
        .layout--float .fn__flex-1.graph.file-tree.sy__globalGraph .graph__panel {
            background-color: var(--QYL-filter-background-fix) !important;
        }
        /* 反向链接取消钉住毛玻璃 */
        .layout--float .fn__flex-1.fn__flex-column.file-tree.sy__backlink {
            background-color: rgba(255, 0, 0, 0) !important;
        }
        .layout--float .fn__flex-1.fn__flex-column.file-tree.sy__backlink .layout-tab-container.fn__flex-1 {
            background-color: rgba(255, 0, 0, 0) !important;
        }
        .layout--float .fn__flex-1.fn__flex-column.file-tree.sy__backlink .b3-menu {
            background-color: rgba(255, 0, 0, 0) !important;
        }
        /* 修复自定义属性面板毛玻璃 */
        div[data-key="dialog-attr"] .layout-tab-bar {
            background-color: rgba(255, 0, 0, 0) !important;
        }
    `;
}

// 关闭毛玻璃效果
function disableQYLAreo() {
    const styleSheet = document.getElementById("QYLAero-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}

// 关闭多彩标签和多彩行级代码
function enablecancleQYLcolorfultag() {
    let styleSheet = document.getElementById("QYLcolorfultag-style");
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = "QYLcolorfultag-style";
        document.head.appendChild(styleSheet);
    }
    styleSheet.innerText = `
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:is(:nth-of-type(8n+1), :nth-of-type(8n+2), :nth-of-type(8n+3), :nth-of-type(8n+4), :nth-of-type(8n+5), :nth-of-type(8n+6), :nth-of-type(8n+7), :nth-of-type(8n)) {
            border-radius: var(--b3-border-radius);
            border: none;
            padding: 3px 5px;
            font-size: 80%;
            color: #ff5f6f;
            background-color: rgba(255, 95, 111, 0.3);
            transition: var(--b3-transition);
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:is(:nth-of-type(8n+1), :nth-of-type(8n+2), :nth-of-type(8n+3), :nth-of-type(8n+4), :nth-of-type(8n+5), :nth-of-type(8n+6), :nth-of-type(8n+7), :nth-of-type(8n))::before {
            content: "#";
            color: #ff5f6f;
            margin-right: 5px;
            position: relative;
            top: 0.5px;
            transition: var(--b3-transition);
        }
        .protyle-wysiwyg [data-node-id] span[data-type~=tag]:is(:nth-of-type(8n+1), :nth-of-type(8n+2), :nth-of-type(8n+3), :nth-of-type(8n+4), :nth-of-type(8n+5), :nth-of-type(8n+6), :nth-of-type(8n+7), :nth-of-type(8n)):hover {
            background-color: rgba(255, 95, 111, 0.5);
            transition: var(--b3-background-transition);
        }
        :is(.fn__code, .b3-typography code, .b3-typography span[data-type~=code], .protyle-wysiwyg code, .protyle-wysiwyg span[data-type~=code]):is(:nth-of-type(8n+1), :nth-of-type(8n+2), :nth-of-type(8n+3), :nth-of-type(8n+4), :nth-of-type(8n+5), :nth-of-type(8n+6), :nth-of-type(8n+7), :nth-of-type(8n)) {
            color: rgb(226, 115, 115);
        }
    `;
}

// 关闭多彩标签和多彩行级代码
function disablecancleQYLcolorfultag() {
    const styleSheet = document.getElementById("QYLcolorfultag-style");
    if (styleSheet) {
        styleSheet.innerText = '';
    }
}