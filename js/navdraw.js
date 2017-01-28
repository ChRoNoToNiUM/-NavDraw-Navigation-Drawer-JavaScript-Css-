function NavDrawJS(options){
    if (typeof options === 'undefined') {
        options = {};
    }



    var hamb_style =
        " width: 50px;\
          cursor: pointer;\
        ";
    var layer_style =
        " border-radius: 12px; \
          display: block; \
          width: 25px;\
          height: 4px;\
          margin: 5px 12px;\
          margin-top: 0;\
          background-color: #fff;\
        ";

    var startPageX = null;
    var endPageX = null;
    var date_temp;
    var touched = false;
    var shiftX = null;

    var mobility = false;
    var close_timeout;
    var log_steps = 11;
    var info = document.getElementById('info');

    //Getting elements or creating if they do not exist
    options.first_hamb_layer = options.first_hamb_layer || mkNewElement('span', 'first_hamb_layer', 'hamb_layer', layer_style);
    options.middle_hamb_layer = options.middle_hamb_layer || mkNewElement('span', 'middle_hamb_layer', 'hamb_layer', layer_style);
    options.last_hamb_layer = options.last_hamb_layer || mkNewElement('span', 'last_hamb_layer', 'hamb_layer', layer_style);
    options.hamburger = options.hamburger || mkNewElement('div', 'hamburger', null, null,
    [
        options.first_hamb_layer,
        options.middle_hamb_layer,
        options.last_hamb_layer
    ]);
    options.nav_draw = options.nav_draw || mkNewElement('div', 'nav_draw', 'closed');
    options.nav_touch_bar = options.nav_touch_bar || mkNewElement('div', 'nav_touch_bar');
    /*options.navdraw_container = mkNewElement('div', 'navdraw_container', null, null,
    [
        options.hamburger,
        options.navdraw_touch_bar,
        options.navdraw
    ]);

    if (options.navdraw_container.parentNode == null) document.body.insertBefore(options.navdraw_container,document.body.firstChild);*/

    addListener(options.hamburger, 'click', onClickHamburger);
    addListener(window, 'selectstart', ePreventDefault);
    addListener(window, 'dragstart', function()
    {
        touched = false;
    });
    if (window.ontouchstart !== undefined)
    {
        mobility = true;
        addListener(window, 'touchstart', moveStart);
        addListener(window, 'touchmove', move);
        addListener(window, 'touchend', moveStop);
    }
    else
    {
        addListener(window, 'mousedown', moveStart);
        addListener(window, 'mousemove', move);
        addListener(window, 'mouseup', moveStop);
    }

    function addListener(el, type, handler, flag){
        if ( !flag ) flag = false;
        if ( el.addEventListener )
        {
            el.addEventListener(type, handler, flag);
        }
        else
        {
            el.attachEvent("on" + type, handler);
        }
    }
    function mkNewElement(tag, id, cls, styles, childs)
    {
        var element = document.createElement(tag);
        var assignedClass = "---No class was assigned";
        var assignedChilds = "---No childs were assigned";

        if (cls) assignedClass = "---Assigned element class: " + cls;
        if (styles) element.style = styles;

        element.id = id;
        element.className = cls;

        if (childs)
        {
            assignedChilds = "---Assigned element childs:\n\n"
            for (var i=0; i<childs.length; i++)
            {
                element.appendChild( childs[i] );
                assignedChilds += "\t\t Child: " + childs[i].tagName + " | Child id: " + childs[i].id + " | Child class: " + childs[i].className + "\n";
            }
        }

        console.log( "@ NavDrawJS @:" );
        console.log( "\tNew element was created: " + tag);
        console.log( "\t---Assigned element id: " + id);
        console.log( "\t" + assignedClass );
        console.log( "\t" + assignedChilds);
        return element;
    }
    function getCoords(elem)
    {
        var box = elem.getBoundingClientRect(),
            body = document.body,
            docEl = document.documentElement,

            scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop,
            scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft,

            clientTop = docEl.clientTop || body.clientTop || 0,
            clientLeft = docEl.clientLeft || body.clientLeft || 0,

            top = box.top + scrollTop - clientTop,
            left = box.left + scrollLeft - clientLeft;

        return {
            top: top,
            left: left
        };
    }
    function isDescendant(parent, child) {
        var node = child.parentNode;

        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }
    function ePreventDefault(e)
    {
        if(e.stopPropagation) e.stopPropagation();
        if (e.preventDefault) e.preventDefault();
        e.cancelBubble=true;
        e.returnValue=false;
        return false;
    }
    function setTransition(trans)
    {
        if (trans === null || trans === undefined)
        {
            options.nav_draw.style.transition = 'none';
            options.hamburger.style.transition = 'none';
            options.first_hamb_layer.style.transition = 'none';
            options.middle_hamb_layer.style.transition = 'none';
            options.last_hamb_layer.style.transition = 'none';
        }
        else
        {
            options.nav_draw.style.transition = 'left ' + trans;
            options.hamburger.style.transition = 'transform ' + trans + ', background ' + trans;
            options.first_hamb_layer.style.transition = 'width ' + trans + ', margin ' + trans + ', transform ' + trans;
            options.middle_hamb_layer.style.transition = '';
            options.last_hamb_layer.style.transition = 'width ' + trans + ', margin ' + trans + ', transform ' + trans;
        }
    }



    function onClickHamburger()
    {
        if (options.nav_draw.className == 'opened')
        {
            closeDrawer();
        }
        else if (
            options.nav_draw.className == 'closed' ||
            options.nav_draw.className == ''
        ){
            openDrawer();
        }
    }

    function openDrawer(deg)
    {
        options.nav_draw.className = 'opened';
        options.nav_draw.style.left = 0;
        setTransition('.3s');

        options.hamburger.style.transform = 'rotate(' + (deg !== undefined ? deg : 180) + 'deg)';
        options.hamburger.style.background = '#eee';

        options.first_hamb_layer.style.width = '14px';
        options.first_hamb_layer.style.marginLeft = '19px';
        options.first_hamb_layer.style.transform = 'rotate(38deg) translateY(5px)';


        options.middle_hamb_layer.style.width = '17px';
        options.middle_hamb_layer.style.marginLeft = '12px';


        options.last_hamb_layer.style.width = '14px';
        options.last_hamb_layer.style.marginLeft = '19px';
        options.last_hamb_layer.style.transform = 'rotate(-38deg) translateY(-5px)';


        console.log("@ NavDrawJS @ [cmd]: Open drawer");
    }
    function closeDrawer(deg)
    {
        timeout = setTimeout(function()
        {
            if (options.nav_draw.className == 'closed')
            {
                options.hamburger.style.transition = 'none';
                options.hamburger.style.transform = 'rotate(0deg)';
            }
            clearTimeout( timeout );
            timeout = false;
        }, 400);
        options.nav_draw.className = 'closed';
        options.nav_draw.style.left = -290;
        setTransition('.3s');

        options.hamburger.style.transform = 'rotate(' + (deg !== undefined ? deg : 360) + 'deg)';

        options.last_hamb_layer.style.transform = 'rotate(0deg) translateY(0px)';
        options.hamburger.style.background = 'none';

        options.first_hamb_layer.style.width = '23px';
        options.first_hamb_layer.style.marginLeft = '8px';
        options.first_hamb_layer.style.transform = 'rotate(0deg) translateY(0px)';

        options.middle_hamb_layer.style.width = '23px';
        options.middle_hamb_layer.style.marginLeft = '8px';


        options.last_hamb_layer.style.width = '23px';
        options.last_hamb_layer.style.marginLeft = '8px';

        console.log("@ NavDrawJS @ [cmd]: Close drawer")
    }
    function moveStart(ev){
        if ( !mobility ) ePreventDefault(ev);

        var pageX = mobility ? ev.touches[0].pageX : ev.pageX;
        var date = new Date();
        date_temp = date;


        shiftX = pageX - getCoords(nav_draw).left;
        startPageX = pageX;

        setTransition();
        if (
            ev.target == options.nav_touch_bar ||
            isDescendant(options.nav_draw, ev.target)
        ){
            touched = true;
        }
        else
        {
            touched = false;
        }
    }

    function move(ev){
        ePreventDefault(ev);
        if (touched)
        {
            var pageX = mobility ? ev.touches[0].pageX : ev.pageX;
            var xPage = (pageX - shiftX - getCoords(document.body).left) * 100/270;
            var arr_width = 14 - ( xPage * 8/100 );
            var arr_width_middle = 14 - ( xPage * 8/100 );
            var margin_left = 19 + ( xPage * 19/100 );
            var margin_left_middle = 11 + ( xPage * 11/100 );

            var hamb_rotate = 180 + (xPage * 180/100);
            var layer_rotate = 38 + ( xPage * 38/100 );
            var layer_transY = 5 + ( xPage * 5/100 );

            var nav_draw_newLeft = ( xPage * 290/100 );
            var rightEdge = 0;

            endPageX = pageX;

            if (options.nav_draw.className == 'opened')
                hamb_rotate = 180 - (xPage * 180/100);

            if (arr_width < 14)
                arr_width = 14;

            if (arr_width_middle < 17)
                arr_width_middle = 17;

            if (margin_left < 8)
                margin_left = 8;

            if (margin_left_middle <8)
                margin_left_middle = 8;


            if (arr_width > 23)
                arr_width = 23;

            if (arr_width_middle > 23)
                arr_width_middle = 23;

            if (margin_left > 19)
                margin_left = 19;

            if (margin_left_middle > 11)
                margin_left_middle = 11;

            if (xPage > 0)
            {
                nav_draw_newLeft = rightEdge;
            }
            else if (xPage < -100)
            {
                nav_draw_newLeft = -290;

            }



            if (nav_draw_newLeft != -290 && nav_draw_newLeft != 0)
            {
                options.hamburger.style.transform = 'rotate(' + (  hamb_rotate ) + 'deg)';

                options.nav_draw.style.left = nav_draw_newLeft + 'px';

                options.first_hamb_layer.style.width = arr_width + 'px';
                options.first_hamb_layer.style.marginLeft = margin_left + 'px';
                options.first_hamb_layer.style.transform = 'rotate(' + layer_rotate + 'deg) translateY(' + layer_transY + 'px)';


                options.middle_hamb_layer.style.width = arr_width_middle + 'px';
                options.middle_hamb_layer.style.marginLeft = margin_left_middle + 'px';

                options.last_hamb_layer.style.width = arr_width + 'px';
                options.last_hamb_layer.style.marginLeft = margin_left + 'px';
                options.last_hamb_layer.style.transform = 'rotate(-' + layer_rotate + 'deg) translateY(-' + layer_transY + 'px)';
            }
        }
    };


    function moveStop(ev){
        var nav_bar_offsetLeft = getCoords(nav_draw).left;
        var edge = -120;
        var date = new Date();
        var timeGap = date - date_temp;

        if (touched == true)
        {
            if (startPageX !== null && endPageX !== null)
            {
                if ( (endPageX - startPageX) > 50 && (timeGap < 150 && timeGap > 50))
                {
                    openDrawer(180);
                }
                else if ( (endPageX - startPageX) < -50 && (timeGap < 150 && timeGap > 50))
                {
                    if (options.nav_draw.className == 'opened')
                        closeDrawer(360);
                    else
                        closeDrawer(0);
                }
                else
                {
                    if (nav_bar_offsetLeft < edge)
                    {
                        if (options.nav_draw.className == 'opened')
                            closeDrawer(360);
                        else
                            closeDrawer(0);
                    }
                    else if (nav_bar_offsetLeft > edge || nav_bar_offsetLeft == edge)
                    {
                        openDrawer(180);
                    }
                }
            }
            touched = false;
            startPageX = null;
            endPageX = null;
            setTransition('.2s');
        }
    };


}
