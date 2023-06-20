// Homework: expand for a variable number of files and beats


let hh, clap, kick; //container for an audio file
let hPat, cPat, kPat; // array of 1s and 0s
let hPhrase, cPhrase, kPhrase; // phrase. defines how a pattern is intepreted
let seq; // part.
let toggleStart;
let beatLength;

let cnv;

let sPat;


function setup() {
  cnv = createCanvas(400, 100);
  cnv.mousePressed(canvasClicked);
  
  beatLength = 16;

  //hh = loadSound('assets/hh.wav', function() {seq.loop();});
  // equivalent: arrow function
  
  toggleStart = createButton("start/stop").position(10,10).mousePressed(() =>
{                                                                        if(!seq.isPlaying){
    seq.loop();
    toggleStart.html("Playing");
  } else {
    seq.stop();
    toggleStart.html("Stopped");
  }
});
  hh = loadSound("assets/hh.wav");
  clap = loadSound("assets/clap.wav");
  kick = loadSound("assets/kick.wav");

  hPat = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  cPat = [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1];
  kPat = [1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0];
  
  sPat = [];
  console.log(sPat);
  for (let i = 0; i < beatLength; i++){sPat.push(i)};

  hPhrase = new p5.Phrase("hh", function(time){hh.play(time);}, hPat);
  cPhrase = new p5.Phrase("clap", function(time){clap.play(time);}, cPat);
  kPhrase = new p5.Phrase("kick", function(time){kick.play(time);}, kPat);

    
  seq = new p5.Part();
  seq.addPhrase(hPhrase);
  seq.addPhrase(cPhrase);
  seq.addPhrase(kPhrase);
  
  seq.addPhrase("seq", sequence, sPat);
  
  userStartAudio();
   seq.setBPM(80);

  drawMatrix();
  drawPlayhead();

}

function draw() {}

function drawMatrix() {
  background(220);
  stroke("black");
  fill("white");
  
  // vertical grid
  
  for(let i = 0; i < beatLength; i ++ ){
    line(i*width/beatLength, 0, i*width/beatLength, height)
  }
  
  //horizontal grid
  
  for(let i = 0; i < 3; i++){
    line(0, i*height/3, width, i*height/3)
  }
  for (let i= 0; i < beatLength; i++){
    
    if(hPat[i]==1){
      ellipse(i*width/beatLength+0.5*width/beatLength, 1/6*height, 10)
      };
    if(cPat[i]==1){
      ellipse(i*width/beatLength+0.5*width/beatLength, 3/6*height, 10)
      };
    
    if(kPat[i]==1){
      ellipse(i*width/beatLength+0.5*width/beatLength, 5/6*height, 10)
    }
  }
  
}


function canvasClicked (){
  let rowClicked = floor(mouseY/height*3);
  let colClicked = floor(mouseX/width*beatLength);
  
  if (rowClicked == 0){
    hPat[colClicked] = invert(hPat[colClicked]);
  } else if (rowClicked ==1){
    cPat[colClicked] = invert(cPat[colClicked]);
  }else if (rowClicked == 2){
    kPat[colClicked] = invert(kPat[colClicked]);
  };
  
  drawMatrix();

  console.log(rowClicked, colClicked);
};

function invert(inputBit){
  if(inputBit == 0){return 1}else{return 0};
  
};

function sequence(time, beatIndex){
  setTimeout(() => {
    drawMatrix();
    drawPlayhead(beatIndex);
  }, time*1000);
}

function drawPlayhead(beatIndex) {
  stroke("red");
  fill(255,0,0,30);
  rect(width/beatLength*beatIndex, 0, width/beatLength, height);
  
};


