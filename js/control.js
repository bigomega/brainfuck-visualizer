
var currPos=0,
	a=[],
	keyPressFlag=0,
	keyPressTimer=0,
	sId=0,
	keyFlag=false,
	keyFlags=false,
	soundFlag=false,
	helloWorld="++++++++++\n[\n>+++++++\n>++++++++++\n>+++\n>+\n<<<<-\n]\n>++.H\n>+.'e'\n+++++++\n. 'l'\n. 'l'\n+++. 'o'\n>++. ' '\n<<+++++++++++++++. 'W'\n>. 'o'\n+++. 'r'\n------. 'l'\n--------. 'd'\n>+.'!'\n>.'\\n'";
	fibonacci="+++++++++++>+>>>>++++++++++++++++++++++++++++++++++++++++++++>++++++++++++++++++++++++++++++++<<<<<<[>[>>>>>>+>+<<<<<<<-]>>>>>>>[<<<<<<<+>>>>>>>-]<[>++++++++++[-<-[>>+>+<<<-]>>>[<<<+>>>-]+<[>[-]<[-]]>[<<[>>>+<<<-]>>[-]]<<]>>>[>>+>+<<<-]>>>[<<<+>>>-]+<[>[-]<[-]]>[<<+>>[-]]<<<<<<<]>>>>>[++++++++++++++++++++++++++++++++++++++++++++++++.[-]]++++++++++<[->-<]>++++++++++++++++++++++++++++++++++++++++++++++++.[-]<<<<<<<<<<<<[>>>+>+<<<<-]>>>>[<<<<+>>>>-]<-[>>.>.<<<[-]]<<[>>+>+<<<-]>>>[<<<+>>>-]<<[<+>-]>[<+>-]<<<-]"
	factorial="+++++++++++++++++++++++++++++++++>+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++>++++++++++>+++++++>>+<<[>++++++++++++++++++++++++++++++++++++++++++++++++.------------------------------------------------<<<<.-.>.<.+>>>>>>>++++++++++<<[->+>-[>+>>]>[+[-<+>]>+>>]<<<<<<]>[<+>-]>[-]>>>++++++++++<[->-[>+>>]>[+[-<+>]>+>>]<<<<<]>[-]>>[++++++++++++++++++++++++++++++++++++++++++++++++.[-]]<[++++++++++++++++++++++++++++++++++++++++++++++++.[-]]<<<++++++++++++++++++++++++++++++++++++++++++++++++.[-]<<<<<<.>>+>[>>+<<-]>>[<<<[>+>+<<-]>>[<<+>>-]>-]<<<<-]";

var strip,
	index,
	action="",
	t=0,
	speed=3000,
	resetFlag=true,
	runningFlag=false,
	animFlag=true,
	input='',
	out='',
	main='',
	jumpArr=[],
	jumpArr2=[];

function runReset(){
	reset();
	stopEdit();
	run();
}

stopEdit=function(){
	$("#main").css('display','none');
	$('#mainDiv').css('display','inline-block');
	main=document.getElementById('main').value.replace(/<(\w)/g,'< $1')+" ";
	$('#mainDiv').html(main.replace(/\n/g,'<br>').replace(/ /g,'&nbsp;'));
	//console.log(document.getElementById('mainDiv').innerHTML);

	temp=parseInt($("#inpWell").css('height'));
	$("#inpForm").css('display','none');
	$('#inpDiv').css('display','inline-block');

	$('#inpDiv').html(document.getElementById('inp').value);
	$("#inpWell").css('height',temp+40);

	$('#action').html(action);

	//$("#mainDiv").css('width','-=25');
	if($("#mainDiv").width()>$("#mainWell").width()-40) 
		$("#mainDiv").width($("#mainWell").width()-40);

	$("#run").addClass("disabled");
	$("#compile").addClass("disabled");

	speed=parseInt($("#speed").val())||1000;
	if(speed<500){
		speed=500;$("#speed").val(500);
	}

	$("#alert").hide(500);
	keyFlags=keyFlag;
	keyFlag=true;

	$("#keyFlag").hide(500);
}

stopSim=function(){
	clearTimeout(t);
	$("#main").css('display','inline-block');
	$('#mainDiv').css('display','none');
	$('#mainDiv').html('');

	$("#inpForm").css('display','inline-block');
	$('#inpDiv').css('display','none');
	$('#inpDiv').html('');
	
	$("#run").removeClass("disabled");
	$("#compile").removeClass("disabled");

	if(out) $("#out").html(out);

	$("#alert").show(500);
	keyFlag=keyFlags;

	$("#keyFlag").show(500);
}

reset=function(){
	stopSim();
	if(resetFlag){
		clearTimeout(t);
		$("#mover").html('<div id="s-5" class="strip"></div><div id="s-4" class="strip"></div><div id="s-3" class="strip"></div><div id="s-2" class="strip"></div><div id="s-1" class="strip"></div><div id="s0" class="strip"></div><!--mid--><div id="s1" class="strip"></div><div id="s2" class="strip"></div><div id="s3" class="strip"></div><div id="s4" class="strip"></div><div id="s5" class="strip"></div>');
		a=[0];
		currPos=0;
		action="";
		keyPressFlag=0;
		keyPressTimer=0;
		sId=0;
		jumpArr2=[];
		jumpArr=[];
	}
}

function run(){
	strip=[0];
	index=0;
	var loopStack=new Array();
	var loopFlag=0;
	var innerLoopCount=0;
	var j=0,k;
	out="";
	console.log(main);
	//main=document.getElementById('main').value;
	input=document.getElementById('inp').value;
	for(i=0;i<main.length;i++){
		var element=main[i];
		if(loopFlag==1){
			if(element=='[')
				innerLoopCount++;
			else if(element==']'){
				if(innerLoopCount==0){
					loopFlag=0;
					jumpArr2.push([k,i+1]);
				}
				else
					innerLoopCount--;
			}
			continue;
		}
		switch(element){
			case '+':
				strip[index]++;
				action+="+";
				break;
			case '-':
				strip[index]--;
				action+="-";
				break;
			case ',':
				strip[index]=input[j] && input[j++].charCodeAt(0)||0;
				console.log(strip[index]);//its ascii value
				action+=",";
				break;
			case '.':
				out+=String.fromCharCode(strip[index])||"\n";
				//console.log(String.fromCharCode(strip[index]));
				action+=".";
				break;
			case '>':
				index+=1;
				strip[index]=strip[index]||0;
				action+=">";
				break;
			case '<':
				index-=1;
				strip[index]=strip[index]||0;
				//if (index<0) {alert("Array-Out-Of-Bound-Exception:\ncrossed the left end of the strip");return false;};//Finite start
				action+="<";
				break;
			case '[':
				if(strip[index]==0){
					loopFlag=1;
					k=i;
				}
				else{
					loopStack.push(i);
					jumpArr2.push([i,i+1]);
				}
				break;
			case ']':
				if(strip[index]!=0){
					k=loopStack[loopStack.length-1];
					jumpArr.push([i,k+1]);
					i=k;
				}
				else{
					loopStack.pop();
					jumpArr.push([i,i+1]);
				}
				break;
			default:
				break;
		}
	}
	if(out) document.getElementById("out").innerHTML=out;
	action+=" ";
	//Let the action begin
	if(animFlag) stripAction(0,-1,-1,-1,0,0);
	else stopSim();
	animFlag=true;
}

stripAction=function(w,x,y,z,i,j){
	runningFlag=true;
	//action-w main-x  input-y out-z jumpArr-i jumpArr2-j
	if(x>=main.length-1){
		runningFlag=false;
		stopSim();
		return;
	}

	console.log(w+"-"+x+"-"+"-"+y+"-"+z+"-"+i+"-"+j);
	if(main[x]=="\n"){
		//donot color
		stripAction(w,x+1,y,z,i,j);
		return;
	}
	//color-main[x] input[y] and out[z] 
	if(action[w]){
		temp=action.slice(0,w)+"<span style='color:red;background:yellow;font-weight:bold;border-radius:100%;border:1px solid red;'>&nbsp;"+action[w]+"&nbsp;</span>"+action.slice(w+1);
		$("#action").html(temp);
	}

	if(main[x]){
		temp=main.slice(0,x)+"<span style='color:darkviolet;background:#ef6fff;font-weight:bold;border-radius:100%;border:1px solid darkviolet;'>&nbsp;"+main[x]+"&nbsp;</span>"+main.slice(x+1);
		$("#mainDiv").html(temp.replace(/\n/g,'<br>').replace(/  /g,' &nbsp;'));
	}

	if(input[y]){
		temp=input.slice(0,y)+"<span style='color:green;background:lightgreen;font-weight:bold;border-radius:100%;border:1px solid green;'>&nbsp; "+input[y]+" &nbsp;</span>"+input.slice(y+1);
		$("#inpDiv").html(temp+"--");
	}

	if(out[z]){
		temp=out.slice(0,z)+"<span style='color:blue;background:lightblue;font-weight:bold;border-radius:100%;border:1px solid blue;'>&nbsp; "+out[z]+" &nbsp;</span>"+out.slice(z+1);
		$("#out").html(temp);
	}

	//console.log(x+main[x]+j+jumpArr2[j])
	if(main[x]==']' && jumpArr[i] && x==jumpArr[i][0]){
		//just move to jumparr[i++][1];
		x=jumpArr[i++][1];
		//w++;
	}
	else if(main[x]=='[' && jumpArr2[j] && x==jumpArr2[j][0]){
		//just move to jumparr2[j++][1];
		x=jumpArr2[j++][1];
		//w++;
	}
	else{
		if(action[w]==main[x] && main[x]=='.' || main[x]==',' ||main[x]=='>' || main[x]=='<' || main[x]=='+' || main[x]=='-'){
			//animate
			a[currPos]=a[currPos]||0;
			now=action[w];
			switch(now){
				case '+':
					set(++a[currPos]);
					break;
				case '-':
					set(--a[currPos]);
					break;
				case '<':
					move(0);
					break;
				case '>':
					move(1);
					break;
				case ',':
					set(input[y] && input[y].charCodeAt(0)||0);
					//y++;
					break;
				case '.':
					//z++;
					break;
				default:
					break;
			}
			w++;
		}
		x++;
	}
	if(main[x] && main[x]==action[w] && main[x]=='.' || main[x]==','){
		if (main[x]=='.') 
			z++;
		else if(main[x]==',')
			y++;
		console.log("---"+main[x])
	}
	t=setTimeout(function(){stripAction(w,x,y,z,i,j);},speed);
}

move=function(dir){
	//$("audio").remove();
	/*$("<audio></audio>").attr({ 
		'src':'audio/typewriter-return-1.mp3', 
		'volume':0.5,
		'autoplay':'autoplay'
	}).appendTo("body");*/
	if(soundFlag) $("#moveS")[0].play();
	if(dir==0){
		//move marker right ie strip to left
		val=a[currPos-6];
		size=(val+"").length
		clas=(size==1)?"1":(size==2)?"2":"3";
		val=val||"";

		if(!document.getElementById('s'+(currPos-6))){
			$("#mover").prepend("<div id='s"+(currPos-6)+"' class='strip'><span class='ascii"+clas+"'>"+val+"</span></div>").css("left","-=40");
		}

		$("#mover").animate({
			left: '+=40'
		},100).queue(function(next){
			$("#s"+(currPos+5)).remove();
			currPos-=1;
			next();
		});
	}
	else{
		//move marker left ie strip to right
		val=a[currPos+6];
		size=(val+"").length
		clas=(size==1)?"1":(size==2)?"2":"3";
		val=val||"";

		if(!document.getElementById('s'+(currPos+6))){
			$("#mover").append("<div id='s"+(currPos+6)+"' class='strip'><span class='ascii"+clas+"'>"+val+"</span></div>");
		}

		$("#mover").animate({
			left: '-=40'
		},100).queue(function(next){
			$("#s"+(currPos-5)).remove();
			$("#mover").css("left","+=40")
			currPos+=1;
			next();
		});
	}
}

set=function(val){
	//size=Math.floor(Math.log(val)/Math.log(10)+1);
	if(soundFlag) $("#typeS")[0].play();
	val=val;
	a[currPos]=val;
	size=(val+"").length
	clas=(size==1)?"1":(size==2)?"2":"3";
	val=val||"";
	$("#s"+currPos).html("<span class='ascii"+clas+"'>"+val+"</span>");
}

singleClick=function(event){
	el=$(document.elementFromPoint(event.clientX,event.clientY));
	//alert(el.attr("class"));
	//if the dblckick is blcokced using a timer then class is RIGHT_BUTTON else PRESSING
	if(el.is("div .left_button_pressing"))
		move(0);
	else if(el.is("div .right_button_pressing"))
		move(1);
	else if(el.is("div .zero_button_pressing"))
		set(0);
	else if(el.is("div .one_button_pressing"))
		set(1);
	else if(el.is("div .null_button_pressing"))
		set(undefined);
}

resize=function(){
	width=$(window).width();
	height=$(window).height();
	//console.log(width);
	if (width<950) $("#inp").removeClass().addClass("search-query input-small");
	else if(width<1220) $("#inp").removeClass().addClass("input-medium search-query");
	else $("#inp").removeClass().addClass("input-large search-query");

	newW=parseInt($("#cont").width()/2)-200;
	document.getElementById("full").style.left=newW+"px";

	$("#mainDiv").css('width',$("#mainWell").width());
	$("#mainDiv").css('max-height',parseInt(height*0.9)-200);
	$("#action").css('max-height',parseInt(height*0.30)-30);
	//console.log($("#mainWell").css('max-height'));
}

$(window).resize(function(){
	resize();
});

$(document).ready(function(){
	a[0]=0;
	a[-1]=0;
	a[1]=0;

	resize();

	$(document).keydown(function(event){
		if(keyFlag) return true;
		a[currPos]=a[currPos]||0;
		if(event.keyCode==37){
			//left
			if(keyPressFlag==0){
				move(0);
				keyPressFlag=1;
				setTimeout(function(){keyPressFlag=0;},150);
			}
		}
		else if(event.keyCode==39){
			//right
			if(keyPressFlag==0){
				move(1);
				keyPressFlag=1;
				setTimeout(function(){keyPressFlag=0},150);
			}
		}
		else if(event.keyCode==38){
			//up
			set(++a[currPos]);
		}
		else if(event.keyCode==40){
			//down
			set(--a[currPos]);
		}
		else if(event.keyCode==16){
			//Shift
			set(document.getElementById("inp").value.charCodeAt(0)||0);
		}
		else if(event.keyCode==17){
			//ctrl
			document.getElementById("out").innerHTML+=String.fromCharCode(a[currPos])||"\n";
		}
		return true;
	});
});

window.onblur=function(){
	stopSim();
	return;
}

resetButton=function(){
	resetFlag=!resetFlag;
	if(resetFlag) document.getElementById("reset").className="btn btn-mini btn-inverse disabled";
	else document.getElementById("reset").className="btn btn-mini btn-inverse";
}