import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PostService, Post } from '../../services/post.service';

const ACCENT_COLORS = [
  'linear-gradient(135deg,#6a1b9a,#ab47bc)',
  'linear-gradient(135deg,#1565c0,#42a5f5)',
  'linear-gradient(135deg,#00695c,#4db6ac)',
  'linear-gradient(135deg,#e65100,#ffa726)',
  'linear-gradient(135deg,#880e4f,#f06292)',
  'linear-gradient(135deg,#1b5e20,#66bb6a)',
];

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {
  allPosts = signal<Post[]>([]);
  searchTerm = signal('');

  filteredPosts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.allPosts();
    return this.allPosts().filter(p =>
      p.title.toLowerCase().includes(term) || p.author.toLowerCase().includes(term)
    );
  });

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => this.allPosts.set(posts));
  }

  onSearch(value: string) { this.searchTerm.set(value); }

  accentColor(i: number): string { return ACCENT_COLORS[i % ACCENT_COLORS.length]; }

  readTime(content: string): number { return Math.max(1, Math.ceil(content.split(' ').length / 200)); }
}
