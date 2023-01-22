video="";
status="";
objects=[];
function preload()
{
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function setup()
{
  canvas = createCanvas(580, 480);
  canvas.center();
}

function Start()
{
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status = model Is detecting objects";
   objects =  document.getElementById("object").value;
}
function modelLoaded()
{
    console.log('Model Loaded');
    status = true;
}
function draw(){
    image(video,0,0,580,480);
}
function gotResults(error , results)
{
  if (error) 
  {
    console.log("error");
  }console.log("results");
  objects = results;
}
function draw(){
  image(video,0,0,580,480);
    if (status != ""){
      objectDetector.detect(video, gotResults);
      for( i = 0 ; i < objects.length; i++){

        document.getElementById("status").innerHTML = "Status : Baby detected";        
        fill('#FF0000');
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent  + "%" , objects[i].x + 10 , objects[i].y + 10);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x , objects[i].y ,objects[i].width, objects[i].height);
      }
    }
}
