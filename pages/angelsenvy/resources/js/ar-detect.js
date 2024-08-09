var detectARFeatures = {
    isARComp : false,
    isOnMobileDevice : false,
    rendererInfo : "",

    CalcRendererInfo: function () {
        if (rendererInfo == "") {
          // Create a canvas element which can be used to retrieve information about the GPU.
          var canvas = document.createElement("canvas");
    
          if (canvas) {
            var context =
              canvas.getContext("webgl") ||
              canvas.getContext("experimental-webgl");
    
            if (context) {
              var info = context.getExtension("WEBGL_debug_renderer_info");
    
              if (info) {
                detectARFeatures.rendererInfo = context.getParameter(
                  info.UNMASKED_RENDERER_WEBGL
                );
              }
            }
          }
        }
        return detectARFeatures.rendererInfo;
    },

    doesSupportAnchorRelAR: function () {
        var ret = false;
    
        try {
          ret = document.createElement("a").relList.supports("ar"); //QuickLook on iOS supported check
        } catch (e) {}
    
        return ret;
    },

    isDesktop: function () {
        return (
          !detectARFeatures.isAndroid() &&
          !detectARFeatures.isiOS() &&
          !!navigator.userAgent.match(/mac|win|linux/i)
        ); //user-agent on android includes 'linux' and on iOS includes 'mac'
    },

    isAndroid: function () {
        return navigator.userAgent.match(/android/i);
    },

    isiOS: function () {
        return (
          navigator.userAgent.match(/ipad|iphone/i) ||
          (detectARFeatures.doesSupportAnchorRelAR() && detectARFeatures.GetRendererInfo() == "Apple GPU") ||
          (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
        ); //new ipads don't report iPad in UA.
    },

    isiPhoneAndBelowiOS13: function () {
        if (navigator.userAgent.match(/iphone/i)) {
          var uaindex = navigator.userAgent.indexOf("iPhone OS ");
    
          if (uaindex > -1) {
            var iOSver = navigator.userAgent
              .substr(uaindex + 10, 3)
              .replace("_", ".");
    
            if (Number(iOSver) < 13) {
              return true;
            }
          }
        }
        return false;
    },

    isiOSGPUPreA9: function () {
        if (
            detectARFeatures.rendererInfo.indexOf("PowerVR SGX 543") != -1 ||
            detectARFeatures.rendererInfo.indexOf("PowerVR SGX 554") != -1 ||
            detectARFeatures.rendererInfo.indexOf("Apple A7 GPU") != -1 ||
            detectARFeatures.rendererInfo.indexOf("Apple A8X GPU") != -1 ||
            detectARFeatures.rendererInfo.indexOf("Apple A8 GPU") != -1
        ) {
            return true;
        } //.. assume pre A9 if below iOS 13 (unable to upgrade) && not 6S (Apple A9 GPU)
    
        if ( detectARFeatures.rendererInfo.indexOf("Apple A9 GPU") == -1 && /*not A9*/ detectARFeatures.isiPhoneAndBelowiOS13()) {
            return true;
        }
        return false;
    },

    GetIsDeviceARCompatiblePromise: function (thisClass) {

        return new Promise(function (resolve, reject) {
          
          var result = true; ////Innocent until proven guilty..
    
          thisClass.isOnMobileDevice = false;
    
          if (thisClass.isDesktop()) {
            result = false;
          } else {
            thisClass.isOnMobileDevice = true;
    
            if (thisClass.isiOS()) {
              if (thisClass.doesSupportAnchorRelAR()) {
                result = !thisClass.isiOSGPUPreA9();
              } else {
                result = false;
              }
            } else {
              if (navigator.xr) {
                navigator.xr
                  .isSessionSupported("immersive-ar")
                  .then(function (r) {
                    thisClass.ARComp = r;
                    resolve(r);
                  });
              } else {
                console.log("GetIsDeviceCompatible(): Navigator.XR not found.");
              }
            }
          }
          thisClass.isARComp = result;
          resolve(result);
        }//.bind(this) // @Louis, would fix this method but I'm not changing any code in this branch.
        );
    },

    RunARCompatibleTest: function () {
        return detectARFeatures.GetIsDeviceARCompatiblePromise(detectARFeatures);
    },

    GetIsDeviceARCompatible: function() {
        console.log('checking compatibility')
        return detectARFeatures.isARComp;
    },

    GetIsDeviceOnDesktop: function () {
        return ! detectARFeatures.isOnMobileDevice;
    },

    GetRendererInfo: function() {
        return detectARFeatures.rendererInfo;
    }
}