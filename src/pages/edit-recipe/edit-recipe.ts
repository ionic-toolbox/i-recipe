import { ActionSheetController, AlertController, NavParams } from 'ionic-angular'
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage {
  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  constructor(private navParams: NavParams, private actSheetCtrl: ActionSheetController, private alrtCtrl: AlertController) { }

  ngOnInit() {

    this.mode = this.navParams.get("mode");
    this.initializeForm();
  }

  private initializeForm() {

    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required), 
      'ingredients': new FormArray([])

    });
  }
  onSubmit() {
    console.log(this.recipeForm);

  }

  onManageIngredients() {
    const actionSheet = this.actSheetCtrl.create({
      title: "What do you want to do?",
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
                this.createNewIngredientAlert().present();
          }

        },
        {
          text: "Remove all Ingredients",
          role: 'destructive',
          handler: () => {

          }
        },
        {
          text: "Cancel",
          role: 'cancel'
        }

      ]
    });
    actionSheet.present();


  }

  private createNewIngredientAlert() {

  const newIngredientAlert = this.alrtCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'

        },
        {
          text: 'Add',
          handler: (data) => {
            if (data.name.trim() == '' || data.name == null) {
                return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
        }
        } ]
    })
    return newIngredientAlert;
    
  }
    

}
