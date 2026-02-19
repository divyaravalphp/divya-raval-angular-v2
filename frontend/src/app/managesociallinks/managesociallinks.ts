import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SocialLinkService } from '../services/social-link.service';
import { SocialLink } from '../models/social-link.model';

@Component({
  selector: 'app-manage-social',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './managesociallinks.html',
  styleUrl: './managesociallinks.scss'
})
export class Managesociallinks implements OnInit {
  private fb = inject(FormBuilder);
  socialService = inject(SocialLinkService);

  isModalOpen = signal(false);
  editMode = signal(false);
  selectedId = signal<number | null>(null);

  socialForm = this.fb.group({
    platform_name: ['', Validators.required],
    url: ['', [Validators.required, Validators.pattern('https?://.+')]],
    icon_class: ['', Validators.required], // e.g., 'fab fa-github'
    profile_id: [1] // Defaulting to 1 for your profile
  });

  ngOnInit() {
    this.socialService.fetchLinks();
  }

  openModal(link?: SocialLink) {
    this.isModalOpen.set(true);
    if (link) {
      this.editMode.set(true);
      this.selectedId.set(link.id!);
      this.socialForm.patchValue(link as any);
    } else {
      this.editMode.set(false);
      this.socialForm.reset({ profile_id: 1 });
    }
  }

  save() {
    if (this.socialForm.valid) {
      const payload = this.socialForm.value as SocialLink;
      const action = this.editMode() 
        ? this.socialService.updateLink(this.selectedId()!, payload)
        : this.socialService.createLink(payload);

      action.subscribe(() => {
        this.socialService.fetchLinks();
        this.isModalOpen.set(false);
      });
    }
  }

  delete(id: number) {
    if (confirm('Delete this social link?')) {
      this.socialService.deleteLink(id).subscribe(() => this.socialService.fetchLinks());
    }
  }
}
