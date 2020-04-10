import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CrudService } from '../../common/services/crud/crud.service';
import '@firebase/firestore';

import * as _ from "lodash";

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {

  category: any = [
    {
      name: "Java",
			value: "java",
			selected: true
    },
    {
      name: "Salesforce",
      value: "salesforce",
      selected: false
    },
    {
      name: "Frontend",
      value: "frontend",
      selected: false
    }
  ];

	title: any;
	text: any;
	// java: string;
	// salesforce: string;
	// frontend: string;
	isSubmitted = false;
	selectedCategoryNames: string[];
	newQuestionForm: FormGroup;

	users: Observable<any[]>;

  constructor(
		private router: Router,
		public crudService: CrudService,
	) {}

  ngOnInit(): void {
		this.createNewQuestion()
	}

	createNewQuestion() {
		this.newQuestionForm = new FormGroup({
			title: new FormControl("", [Validators.required]),
			text: new FormControl("", [Validators.required]),
			// java: new FormControl(""),
			// salesforce: new FormControl(""),
			// frontend: new FormControl(""),
			category: this.createCategory(this.category)
		});
		// this.getSelectedCategory();
	}

	createCategory(categoryInputs) {
		const arr = categoryInputs.map(category => {
			return new FormControl(category.selected || false)
		});
		return new FormArray(arr);
	}

	// getSelectedCategory() {
	// 	this.selectedCategoryNames = _.map(
	// 		this.newQuestionForm.controls.category["category"],
	// 		(cat, i) => {
	// 			return cat.value && this.category[i].value;
	// 		}
	// 	)
	// }

	// getSelectedHobbiesName() {
  //   this.selectedCategoryNames = _.filter(this.selectedCategoryNames, function (category) {
  //     if (category !== false) {
  //       return category;
  //     }
	// 	});
	// }

	resetFields() {
		if(this.newQuestionForm.valid) {
			this.newQuestionForm.reset()
		}
  }
	
	onSubmit(value) {
		this.isSubmitted = true;
    if(!this.newQuestionForm.value) {
      return false;
    }
		console.log(this.newQuestionForm);

		this.crudService.createNewQuestion(value)
		.then(
			res => {
				this.resetFields();
				this.router.navigate(['/']);
			}
		)
	}
}
