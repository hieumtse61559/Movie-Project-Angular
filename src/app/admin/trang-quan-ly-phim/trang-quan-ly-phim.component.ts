import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhimService } from 'src/app/services/phim.service';

@Component({
  selector: 'app-trang-quan-ly-phim',
  templateUrl: './trang-quan-ly-phim.component.html',
  styleUrls: ['./trang-quan-ly-phim.component.scss']
})
export class TrangQuanLyPhimComponent implements OnInit {

  myImage: string[] = [];
  // SUbscribe từ server về và xử lí
  MOVIES: Movie[] = [];
  page = 1;
  pageSize = 25;
  collectionSize = 0;
  // Để hiển thị trên table
  movies: Movie[] = [];
  accessToken: string = '';

  // Build form cho user
  movieForm!: FormGroup;

  // Check state of Modal : Add or Edit
  isEditState: boolean = false;

  constructor(
    private movieService: PhimService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    // Lấy accessToken để xử lí 1 số action
    this.accessToken = JSON.parse((localStorage.getItem("nguoiDungDangNhap") as string)).accessToken

    this.movieService.LayDanhSachPhim().subscribe(
      (getSuccess: Movie[]) => {
        this.MOVIES = getSuccess;
        this.collectionSize = this.MOVIES.length;
        this.refreshMovies();
      }
    )
    this.createForm();

  }

  createForm() {
    this.movieForm = this.fb.group({
      'maPhim': ['', [Validators.required]],
      'tenPhim': ['', [Validators.required]],
      'biDanh': ['', [Validators.required]],
      'trailer': ['', [Validators.required]],
      hinhAnh: [null],
      'moTa': ['', [Validators.required]],
      'ngayKhoiChieu': ['', [Validators.required]],
      'danhGia': ['', [Validators.required]],
    })
  }

  refreshMovies() {
    this.movies = this.MOVIES
      .map((movie, i) => ({ id: i + 1, ...movie }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    let filterValueLower = filterValue.toLowerCase();
    // filterValueLower = filterValue.toLowerCase();
    if (filterValue === '') {
      this.refreshMovies();
    }
    if (filterValue !== '') {
      this.movies = this.MOVIES.filter((movie) => {
        movie.tenPhim.includes(filterValueLower)
        let nameMovieLowerCase = movie.tenPhim.toLowerCase();
        return nameMovieLowerCase.includes(filterValueLower)
      })

    }
  }

  deleteMovie(maPhim: number) {
    this.movieService.xoaPhim(maPhim, this.accessToken).subscribe(
      (deleteSuccess) => {
        window.alert("Delete movie successfully !")
      },
      (deleteFail) => {
        console.log(deleteFail)
        window.alert("Xóa phim thành công")

        // Lấy lại danh sách phim và cập nhật lại bảng
        this.movieService.LayDanhSachPhim().subscribe(
          (getSuccess: Movie[]) => {
            this.MOVIES = getSuccess;
            this.collectionSize = this.MOVIES.length;
            this.refreshMovies();
          }
        )
      }
    )
  }

  uploadFile(event: any) {
    console.log(event.target.files[0]);

    const fileImg = (event.target as HTMLInputElement).files[0];
    this.movieForm.patchValue({
      hinhAnh: fileImg
    });
    this.movieForm.get('hinhAnh')?.updateValueAndValidity();

    
    // const apiDate = this.datePipe.transform(this.movieForm.get('ngayKhoiChieu').value, 'dd-MM-yyyy')
  
    // console.log(apiDate)
  }

  openToAdd(content: any) {
    this.isEditState = false;

    this.modalService.open(content,
      {
        centered: true,
      });
    this.movieForm.reset();
  }

  addMovie() {
    console.log(this.movieForm.value);

    // Lấy value từ movieForm để append vào formData 
    let formData: any = new FormData();
    formData.append("maPhim", this.movieForm.get('maPhim')?.value);
    formData.append("tenPhim", this.movieForm.get('tenPhim')?.value);
    formData.append("biDanh", this.movieForm.get('biDanh')?.value);
    formData.append("trailer", this.movieForm.get('trailer')?.value);
    formData.append("hinhAnh", this.movieForm.get('hinhAnh')?.value);
    formData.append("moTa", this.movieForm.get('moTa')?.value);

    // Convert lại định dạng ngày rồi mới gửi
    const apiDate = this.datePipe.transform(this.movieForm.get('ngayKhoiChieu').value, 'dd-MM-yyyy')
    formData.append("ngayKhoiChieu", apiDate);


    formData.append("danhGia", this.movieForm.get('danhGia')?.value);
    formData.append("maNhom", "GP10");


    // Gửi formData vào api để thêm mới phim
    this.movieService.themPhimUploadHinh(formData).subscribe(
      (addSuccess) => {
        console.log(addSuccess)
        window.alert("Thêm phim thành công!")
    
        // Lấy lại danh sách phim và cập nhật lại bảng
        this.movieService.LayDanhSachPhim().subscribe(
          (getSuccess: Movie[]) => {
            this.MOVIES = getSuccess;
            this.collectionSize = this.MOVIES.length;
            this.refreshMovies();
          }
        )

        // Reset form
        this.movieForm.reset();

      },
      (addFail) => {
        console.log(addFail)
        window.alert(addFail.error);
      }
    )


  }
}

interface Movie {
  maPhim: number,
  tenPhim: string,
  trailer: string,
  hinhAnh: string,
  moTa: string,
  ngayKhoiChieu: string,
  danhGia: number
}