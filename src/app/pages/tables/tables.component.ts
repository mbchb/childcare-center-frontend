import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { OrderPipe } from 'ngx-order-pipe';
import { UserService } from 'src/app/core/services/user.service';
import { Role } from 'src/app/core/models/role';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {
  public listUsers: any[];
  closeResult! : string;
  form : any;
  user!: User;
  public displayedColumns = ['firstName', 'lastName', 'phoneNumber', 'email', 'role', 'description'];
  order: string = 'firstName';
  reverse: boolean = false;
  caseInsensitive: boolean = false;
  public roles: Role[];
  private roleSelected: Role;
  p: number = 1;
  searchSelectedRole: any;

  searchForm: any = {
    firstName: '',
    lastName: ''
  };

  constructor(private userService: UserService, private modalService: NgbModal, public orderPipe: OrderPipe,
    public roleService: RoleService,
    ) { 
  }

  ngOnInit() {
    this.roleService.getAllRoles().subscribe((roles: Role[])=> {
      this.roles = roles;
    });
    this.getUsers();
    this.user = {
      idUser: null,
      firstName: null,
      lastName: null,
      email : null,
      description : null,
      phoneNumber : null,
      localisation : null,
      username: null,
      password: null,
      roles: null
    }
  }

  private getUsers() {
    this.userService.getAllUsers().subscribe((res: User[]) => this.listUsers = res);
  }

  public selectRole(role: Role) {
    this.roleSelected = role;
  }

  deleteUser(user: User){
    this.userService.deleteUser(user.idUser).subscribe(() => this.getUsers());
  }

  editUser(user : User){
    this.userService.updateUser(user).subscribe();
  }

  getRole(user: User): string {
    return user.roles[0].name;
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
    closeForm(){
  
    }
    cancel(){
      this.form = false;
    }

    addUser(user: User) {
      this.user.roles = [];
      this.user.roles.push(this.roleSelected);
      this.userService.addUser(user).subscribe(()=> {
        this.getUsers();
        this.user = new User();
      })
    }

    setOrder(value: string) {
      if (this.order === value) {
        this.reverse = !this.reverse;
      }
      this.order = value;
    }

    search() {
      this.userService.search(this.searchForm.firstName, this.searchForm.lastName, this.searchSelectedRole).subscribe((data: User[])=>
      this.listUsers = data);
    }
}
