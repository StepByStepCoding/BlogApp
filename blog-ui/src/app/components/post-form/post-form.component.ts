import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  postId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.postId = Number(this.route.snapshot.paramMap.get('id')) || null;
    this.isEdit = !!this.postId;
    if (this.isEdit && this.postId) {
      this.postService.getPost(this.postId).subscribe(post => this.form.patchValue(post));
    }
  }

  submit() {
    if (this.form.invalid) return;
    const value = this.form.value;
    const action = this.isEdit && this.postId
      ? this.postService.updatePost(this.postId, value)
      : this.postService.createPost(value);

    action.subscribe({
      next: () => {
        this.snackBar.open(this.isEdit ? 'Post updated!' : 'Post created!', 'Close', { duration: 3000 });
        this.router.navigate(['/posts']);
      },
      error: () => this.snackBar.open('Something went wrong.', 'Close', { duration: 3000 })
    });
  }
}
