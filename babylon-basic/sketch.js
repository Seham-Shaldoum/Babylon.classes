 let snowman = class {
       
        constructor(name, height, x, z) {
            this.name = name;
            this.height = height;  
            this.x = x;
            this.z = z;
        }

        build() {
            for (let i = 0; i < this.height*3; i+=2) {
                var box = BABYLON.MeshBuilder.CreateBox("box", {height:0.5-i*0.1,segments:10}, scene);
                box.position = new BABYLON.Vector3(this.x, i + 2*i, this.z);
                box.position.y = i-6;
                var material = new BABYLON.StandardMaterial(scene);
                material.alpha = 1;
                material.diffuseColor = new BABYLON.Color3(50, 0, 5);
                box.material = material;
            }

            let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:0.5}, scene);
            sphere.position = new BABYLON.Vector3(this.x, 1 , this.z - 1);

            let sphere2 = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:0.5}, scene);
            sphere2.position = new BABYLON.Vector3(this.x, -1 , this.z - 1.1);

            let sphere3 = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:0.5}, scene);
            sphere3.position = new BABYLON.Vector3(this.x - 0, this.z - 3.7);

            let sphere4 = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter:0.5}, scene);
            sphere4.position = new BABYLON.Vector3(this.x - 0 , this.z - 5.8);

          
            
        }
    }

    
      
      var canvas = document.getElementById("renderCanvas");

        var startRenderLoop = function (engine, canvas) {
            engine.runRenderLoop(function () {
                if (sceneToRender && sceneToRender.activeCamera) {
                    sceneToRender.render();
                }
            });
        }

        var engine = null;
        var scene = null;
        var sceneToRender = null;
        var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
        var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // let tgt = model_settings.position; 
    // camera.setTarget(BABYLON.Vector3(tgt.x, tgt.y, tgt.z));

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(50, 4, 1), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 1.1;

  let xo = new snowman("xo", 5, 0, 0);
    console.log(xo);
   // xo.build();
    //let xo = new shape('xo',3);
    //console.log(xo)

    for(i = -1; i<50; i++){
        xo.build(i-4,i+2,i+5);
   }

  
    return scene;
};
                window.initFunction = async function() {
                    
                    
                    var asyncEngineCreation = async function() {
                        try {
                        return createDefaultEngine();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEngine();
                        }
                    }

                    window.engine = await asyncEngineCreation();
        if (!engine) throw 'engine should not be null.';
        startRenderLoop(engine, canvas);
        window.scene = createScene();};
        initFunction().then(() => {sceneToRender = scene                    
        });

        // Resize
        window.addEventListener("resize", function () {
            engine.resize();
        });