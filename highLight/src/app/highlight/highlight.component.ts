import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.css']
})
export class HighlightComponent implements OnInit {
  question:string = "";
  textPhrase:string = "";
  answerType:string = "";
  options:Map<string,{isSelected:boolean,isCorrect:boolean}>|null = null;
  isVisible:true|false = false;

  constructor(){}

  ngOnInit(): void {
    
  }

  getSelector(textPhrase:string,answerType:string):Map<string,{isSelected:boolean,isCorrect:boolean}> | null{
    if(answerType === "word"){
      return this.getWordOptions(textPhrase);
    }
    alert("Please choose word!")
    return null;
  }

  getWordOptions(textPhrase:string):Map<string,{isSelected:boolean,isCorrect:boolean}>{
    var map1 = new Map();
    var wordOptions:string[] = textPhrase.split(" ");
    wordOptions = wordOptions.filter((word)=>word !== "");
    wordOptions.map((word)=>{
      map1.set(word,{isSelected:false,isCorrect:false});
    })
    return map1;
  }

  updateVisibility():void{
    console.log(this.question+" "+this.textPhrase+" "+this.answerType)
    if(this.question!="" && this.textPhrase!="" && this.answerType!=""){
      this.options = this.getSelector(this.textPhrase,this.answerType);
    }else{
      this.isVisible = false;
    }
  }

  editOptions(options:Map<string, { isSelected: boolean, isCorrect: boolean }> | null ){
    console.log(options);
    this.options = options;
  }

}
