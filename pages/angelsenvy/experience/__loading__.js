pc.script.createLoadingScreen(function (app) {

    var showSplash = function () {

        var loadingScreen = document.createElement('div');
        loadingScreen.id = 'loading-screen-container';
        document.body.appendChild(loadingScreen);

        var bg = document.createElement('img');
        bg.src = 'https://project-prod-bacardi-animated-model.s3.eu-west-2.amazonaws.com/angels-envy/assets/PaperTexture.jpg';
        bg.id = 'backgroundImage';
        loadingScreen.appendChild(bg);
        bg.onload = function () {
            logoContainer.style.display = 'block';
        };

        var logoContainer = document.createElement('div');
        logoContainer.id = 'logo-container';
        loadingScreen.appendChild(logoContainer);
        logoContainer.style.display = 'none';
        
        var logo = document.createElement('img');
        logo.src = 'https://project-prod-bacardi-animated-model.s3.eu-west-2.amazonaws.com/angels-envy/assets/ToastTrees.png';
        logoContainer.appendChild(logo);
        logo.onload = function () {
            logoContainer.style.display = 'block';
        };
        
        var eyekandyLogo = document.createElement('div');
        eyekandyLogo.id = 'logo-eyekandy';
        loadingScreen.appendChild(eyekandyLogo);
        
        var eigththwallLogo = document.createElement('div');
        eigththwallLogo.id = 'logo-8wall';
        loadingScreen.appendChild(eigththwallLogo);

        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        logoContainer.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);
    };

    var hideLoadingScreen = function () {
        document.getElementById('loading-screen-container').remove();
    };

    var setProgress = function (value) {
        var bar = document.getElementById('progress-bar');
        if(bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    };

    var createCss = function () {
               
        var cssPlayCanvas = [

            '#loading-screen-container {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #e9e9e9;',
            '    background-position: center center;',
            '    z-index: 100',
            '}',

            '#backgroundImage {',
            '    height: 100%;',
            '    width: 100%;',
            '}',

            '#logo-container {',
            '    position: absolute;',
            '    top: 20%;',
            '    left: 50%;',
            '    width: 60%;',
            '    transform: translate(-50%, 0%);',
            '}',

            '#logo-container img {',
            '    width: 100%;',
            '}',

            '#progress-bar-container {',
            '    margin: 20px auto 0 auto;',
            '    top: -100px;',
            '    height: 2px;',
            '    width: 50%;',
            '    background-color: #ffffff;',
            '}',

            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #8A1E41;',
            '}',

            '#logo-8wall {',
            '  position: absolute;',
            '  display: block;',
            '  bottom: 2.6%;',
            '  right: 5%;',
            '  width: 35vw;',
            '  height: 30px;',
            '  background: url(https://project-prod-bacardi-animated-model.s3.eu-west-2.amazonaws.com/angels-envy/assets/8thwall.png) no-repeat center center / contain;',
            '}',
            
            '#logo-eyekandy {',
            '  position: absolute;',
            '  display: block;',
            '  bottom: 2%;',
            '  left: 5%;',
            '  width: 100px;',
            '  height: 30px;',
            '  background: url(https://project-prod-bacardi-animated-model.s3.eu-west-2.amazonaws.com/angels-envy/assets/eyekandy.png) no-repeat center center / contain;',
            '}',
        ];
        
        var css8thWall = [
               
            '#loadBackground {',
            '   position: absolute;',
            '   top: 0;',
            '   left: 0;',
            '   height: 100%;',
            '   width: 100%;',
            '   background-image: url("https://bluebunny-ar.com/assets/empty.png");',
            '   background-color: rgba(0,0,0,0);',
            '   background-size: cover;',
            '   background-position: center;',
            '}',

            '#requestingCameraPermissions {',
                '   display: none',
            '}',


            '#loadImage {',
            '   content: url("https://bluebunny-ar.com/assets/empty.png");',
            '   height: 80vw',
            '   width: 80vw',
            '   display: none',
            '   margin-top: -5em;',
            '   margin-left: -5em;',
            '}',

            '.poweredby-img {',
            '   content: url("https://bluebunny-ar.com/assets/empty.png");',
            '}',
        ];
        
        var css = (cssPlayCanvas.concat(css8thWall)).join("\n");

        var style = document.createElement('style');
        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };

    createCss();
    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideLoadingScreen);
});