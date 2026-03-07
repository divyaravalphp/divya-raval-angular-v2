import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-education',
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education {
  educationList = [
    {
      degree: 'M.Sc. (CA & IT)',
      institution: 'Gujarat University - K.S.School From Business Management',
      period: '2013–2015',
      result: '59.04% (Post-Graduation)'
    },
    {
      degree: 'B.Sc. (CA & IT)',
      institution: 'Gujarat University - K.S.School From Business Management',
      period: '2010–2013',
      result: '57.74% (Graduation)'
    },
    {
      degree: 'H.S.C. (12th Grade)',
      institution: 'Gujarat Secondary Education Board',
      period: 'March 2010',
      result: '84.43% (Distinction)'
    },
    {
      degree: 'S.S.C. (10th Grade)',
      institution: 'Gujarat Secondary Education Board',
      period: 'March 2008',
      result: '76.46% (Distinction)'
    }
  ];
}
