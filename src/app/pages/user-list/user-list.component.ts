import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  userList: any[] = [];

  user: any = {
    userId: 0,
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    isCreate: false,
    isEdit: false,
    isDelete: false,
  };

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList = () => {
    this.http.get('https://localhost:7011/api/User')
    .subscribe((res: any) => {
      this.userList = res;
    });
  }

  setDeleteUser = (user: any) => {
    this.user = {
      userId: user.userId,
      fullName: user.fullName,
      isCreate: false,
      isEdit: false,
      isDelete: true,
    }
  };

  setInsertUser = () => {
    this.user = {
      userId: 0,
      fullName: '',
      email: '',
      password: '',
      mobile: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      isCreate: true,
      isEdit: false,
      isDelete: false,
    }
  }

  setEditUser = (user: any) => {
    this.user = {
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      mobile: user.mobile,
      createdAt: user.createdAt,
      updatedAt: new Date(),
      isCreate: false,
      isEdit: true,
      isDelete: false,
    }
    console.log(this.user)
  }

  closeModal = () => {
    this.user = {
      userId: 0,
      fullName: '',
      email: '',
      password: '',
      mobile: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      isCreate: false,
      isEdit: false,
      isDelete: false,
    }
  };

  deleteUser = () => {
    this.http.delete(`https://localhost:7011/api/User/${this.user.userId}`)
   .subscribe(() => {
      this.closeModal();
      this.getUserList();
      alert("User deleted successfully");
    }, err => {
      alert("Failed to delete user");
    });
  }

  createUser = () => {
    this.http.post('https://localhost:7011/api/User/CreateUser', this.user)
    .subscribe(() => {
      this.closeModal();
      this.getUserList();
      alert("User created successfully");
    }, err => {
      alert("Failed to create user");
    });
  }

  editUser = () => {
    this.http.put(`https://localhost:7011/api/User/${this.user.userId}`, this.user)
    .subscribe(() => {
      this.closeModal();
      this.getUserList();
      alert("User updated successfully");
    }, err => {
      alert("Failed to update user");
    });
  }

}
