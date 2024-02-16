import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from 'src/app/services/book.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Book } from '../Book';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  id: number;
  book = new Book();
  showModal = true;
  bookStatuses = [];
  //book update form parameters
  BookForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private alert: AlertifyService,
              private bookService: BookService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loadBookDetails();
    this.LoadBookUpdateForm(this.book);
  }

  loadBookDetails() {
    this.getAllBookStatus();
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.bookService.getById(this.id).subscribe(res => {
      this.book = res;
    });
  }
  LoadBookUpdateForm(res) {
    this.showModal = true;
    this.BookForm = this.formBuilder.group({
      'id':         [this.id, [Validators.required]],
      'title':      [res.title, [Validators.required]],
      'publisher':  [res.publisher, [Validators.required]],
      'isbn':    [res.isbn, [Validators.required]],
      'bookStatus': [res.bookStatus, [Validators.required]],
      'authorId':   [res.author.id]
    });
  }
  updateBook() {
    if (!this.BookForm.valid) {
      return;
    }
    this.bookService.put(this.id, this.BookForm.value).subscribe(
      res=>{
        this.loadBookDetails();
        this.LoadBookUpdateForm(this.book);
        this.showModal = false;
        this.alert.success('The information in the book has been updated.');
     },
     error=>{
       this.alert.error('Book information has not been updated. Something went wrong.')
     }
    );
  }
  getAllBookStatus(){
    this.bookService.getAllBookStatus().subscribe( res => {
      this.bookStatuses = res;
    });
  }
  get f1() { return this.BookForm.controls; }
  backClicked() {
    this.location.back();
  }
}
