import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import { CrudService } from '../../common/services/crud/crud.service';

import { mycategory } from '../../common/utils/category';
import { QuestionData } from '../../common/utils/question-data.model';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  mycat = mycategory;
  id: string;
  title: string;
  text: string;
  editQuestionForm: FormGroup;
  currentQuestion: QuestionData;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private crudService: CrudService,
  ) { }

  ngOnInit(): void {
    this.currentQuestion = this.crudService.editableQuestion;
    console.log(this.currentQuestion)
    this.editQuestion()
  }

  editQuestion() {
    this.editQuestionForm = new FormGroup({
      title: new FormControl(this.currentQuestion.title, [Validators.required]),
      text: new FormControl(this.currentQuestion.text, [Validators.required]),
      categories: this.createCategory(mycategory)
    });
  }

  createCategory(categoryInputs) {
    const arr = categoryInputs.map(category => {
      return new FormControl(category.selected || false)
    });
    return new FormArray(arr);
  }

  onSubmit(value) {
    if (!this.editQuestionForm.valid) {
      return false;
    }

    this.crudService.updateQuestion(value);
    this.editQuestionForm.reset();
  }

}
