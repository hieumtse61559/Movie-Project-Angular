import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhimService } from 'src/app/services/phim.service';
import { RapphimService } from 'src/app/services/rapphim.service';

@Component({
  selector: 'app-trang-quan-ly-phim',
  templateUrl: './trang-quan-ly-phim.component.html',
  styleUrls: ['./trang-quan-ly-phim.component.scss']
})
export class TrangQuanLyPhimComponent implements OnInit {

  maHeThongRaps: any[] = [];
  danhSachCumRapTheoHeThong: any[] = [];
  rapPhim: any[] = [];

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
  scheduleForm!: FormGroup;

  // Check state of Modal : Add or Edit
  isEditState: boolean = false;

  isUploadFile: boolean = false;

  constructor(
    private movieService: PhimService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private rapPhimSV: RapphimService,
  ) { }

  ngOnInit(): void {
    // Lấy accessToken để xử lí 1 số action
    this.accessToken = JSON.parse((localStorage.getItem("nguoiDungDangNhap") as string)).accessToken

    // Lấy danh sách phim để làm các việc liên quan đến table
    this.movieService.LayDanhSachPhim().subscribe(
      (getSuccess: Movie[]) => {
        this.MOVIES = getSuccess;
        this.collectionSize = this.MOVIES.length;
        this.refreshMovies();
      }
    )
    //Tạo form cho add/edit
    this.createForm();

    // Chủ yếu là maHeThongRap để xử lí
    this.rapPhimSV.layThongTinHeThongRap().subscribe(
      (respone) => {
        this.maHeThongRaps = respone.map(
          (item: any) => {
            return item.maHeThongRap
          }
        )
      },
      (reject) => {
        console.log(reject)
        window.alert(reject.error)
      }
    )

  }

  createForm() {
    this.movieForm = this.fb.group({
      'maPhim': [''],
      'tenPhim': ['', [Validators.required]],
      // 'biDanh': ['', [Validators.required]],
      'trailer': ['', [Validators.required]],
      hinhAnh: [''],
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
        // Lấy lại danh sách phim và cập nhật lại bảng
        this.movieService.LayDanhSachPhim().subscribe(
          (getSuccess: Movie[]) => {
            this.MOVIES = getSuccess;
            this.collectionSize = this.MOVIES.length;
            this.refreshMovies();
          }
        )
      },
      (deleteFail) => {
        console.log(deleteFail)
        window.alert(deleteFail.error)
      }
    )
  }

  uploadFile(event: any) {
    console.log(event.target.files[0]);

    const fileImg = event.target.files[0];
    this.movieForm.patchValue({
      hinhAnh: fileImg ? fileImg : ''
    });
    // this.movieForm.get('hinhAnh')?.updateValueAndValidity();


    // const apiDate = this.datePipe.transform(this.movieForm.get('ngayKhoiChieu').value, 'dd-MM-yyyy')

    // console.log(apiDate)
  }

  // Open modal to add user
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
    // formData.append("maPhim", this.movieForm.get('maPhim')?.value);
    formData.append("tenPhim", this.movieForm.get('tenPhim')?.value);
    // formData.append("biDanh", this.movieForm.get('biDanh')?.value);
    formData.append("trailer", this.movieForm.get('trailer')?.value);
    formData.append("hinhAnh", this.movieForm.get('hinhAnh')?.value);
    formData.append("moTa", this.movieForm.get('moTa')?.value);

    // Convert lại định dạng ngày rồi mới gửi
    const apiDate = this.datePipe.transform(this.movieForm.get('ngayKhoiChieu')?.value, 'dd-MM-yyyy')
    formData.append("ngayKhoiChieu", apiDate);


    formData.append("danhGia", this.movieForm.get('danhGia')?.value);
    formData.append("maNhom", "GP10");


    // Gửi formData vào api để thêm mới phim
    this.movieService.themPhimUploadHinh(formData).subscribe(
      (addSuccess) => {
        console.log(addSuccess)

        if (window.confirm(`${this.movieForm.get('tenPhim')?.value} is added successfully! \nDo you want to add another?`)) {
          // Lấy lại danh sách phim và cập nhật lại bảng
          this.movieService.LayDanhSachPhim().subscribe(
            (getSuccess: Movie[]) => {

              // Reset form
              this.movieForm.reset();

              // Lấy danh sách để cập nhật lại bảng
              this.MOVIES = getSuccess;
              this.collectionSize = this.MOVIES.length;
              this.refreshMovies();


            }
          )
        } else {
          this.modalService.dismissAll("");
          // Lấy lại danh sách phim và cập nhật lại bảng
          this.movieService.LayDanhSachPhim().subscribe(
            (getSuccess: Movie[]) => {
              // Reset form
              this.movieForm.reset();
              this.MOVIES = getSuccess;
              this.collectionSize = this.MOVIES.length;
              this.refreshMovies();
            }
          )
        }


      },
      (addFail) => {
        console.log(addFail)
        window.alert(addFail.error);
      }
    )
  }

  // Open modal to edit user
  openToEdit(content: any, movie: any) {
    this.isEditState = true;
    this.modalService.open(content,
      {
        centered: true,
      });

    console.log(movie);

    // this.movieForm.controls['maPhim'].setValue(movie.maPhim);
    // this.movieForm.controls['tenPhim'].setValue(movie.tenPhim);
    // this.movieForm.controls['biDanh'].setValue(movie.biDanh);
    // this.movieForm.controls['trailer'].setValue(movie.trailer);
    // this.movieForm.controls['moTa'].setValue(movie.moTa);
    // const date = new Date(movie.ngayKhoiChieu)
    // this.movieForm.controls['ngayKhoiChieu'].setValue(date);
    // this.movieForm.controls['danhGia'].setValue(movie.danhGia);

    // Lưu ý khi viết kiểu này, là tất cả các trường của form phải đầy đủ khi được setValue, nếu muốn set value cho 1 trường nào của form thôi thì dùng patchValue({})
    this.movieForm.setValue({
      'maPhim': movie.maPhim,
      'tenPhim': movie.tenPhim,
      'trailer': movie.trailer,
      'moTa': movie.moTa,
      'danhGia': movie.danhGia,
      'hinhAnh': '',
      'ngayKhoiChieu': new Date(movie.ngayKhoiChieu).toISOString().substring(0, 10),
    })

  }

  editMovieInfo() {
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
    const apiDate = this.datePipe.transform(this.movieForm.get('ngayKhoiChieu')?.value, 'dd-MM-yyyy')
    formData.append("ngayKhoiChieu", apiDate);

    formData.append("danhGia", this.movieForm.get('danhGia')?.value);
    formData.append("maNhom", "GP10");


    console.log([...formData]);


    // Gửi formData vào api để thêm mới phim
    this.movieService.capNhatPhimUpload(formData, this.accessToken).subscribe(
      (updateSuccess) => {
        console.log(updateSuccess)
        window.alert("Update movie successfully!")

        // Lấy lại danh sách phim và cập nhật lại bảng
        this.movieService.LayDanhSachPhim().subscribe(
          (getSuccess: Movie[]) => {
            this.MOVIES = getSuccess;
            this.collectionSize = this.MOVIES.length;
            this.refreshMovies();
          }
        )

        // Đóng luôn modal
        this.modalService.dismissAll('Movie was updated !');

      },
      (updateFail) => {
        console.log(updateFail)
        window.alert(updateFail.error);
      }
    )
  }

  // Open modal to create schedule
  openToCreateSchedule(content: any, movie: any) {

    this.modalService.open(content,
      {
        centered: true,
      });

    // Create Schedule Form
    this.scheduleForm = this.fb.group({
      'maPhim': [movie.maPhim],
      'tenPhim': [movie.tenPhim],
      "ngayChieuGioChieu": ['',[Validators.required]],
      "giaVe": ['', [Validators.required]],
      "maHeThongRap": ['', [Validators.required]],
      "maRapPhim": ['', [Validators.required]],
      "maRap": ['', [Validators.required]],

    })



  }

  // MHTR = maHeThongRap
  handleChangeMHTR(maHTR: any) {
    // Mỗi lần thay đổi là phải reset để lấy lại giá trị mới 
    this.rapPhim = []
    console.log(maHTR) // Nó có dạng như vầy : "0: BHDStar"
    console.log(maHTR.split(": ")[1]);
    maHTR = maHTR.split(": ")[1];
    if (maHTR !== undefined) {
      // Lấy được maHTR để lấy danh sách cụm rạp theo hệ thống 
      this.rapPhimSV.layThongTinCumRapTheoHeThong(maHTR).subscribe(
        (respone) => {
          console.log(respone);
          this.danhSachCumRapTheoHeThong = respone;
        },
        (reject) => {
          window.alert(reject.error)
        }
      )
    }
    if(maHTR === undefined){
      this.danhSachCumRapTheoHeThong = [];
    }
  }

  //  CRTHT = Cụm rạp theo hệ thống
  handleChangeCRTHT(tenRapPhim: any) {
    console.log(tenRapPhim.split(": ")[1])

    tenRapPhim = tenRapPhim.split(": ")[1]
    if(tenRapPhim !== undefined){
      this.rapPhim = this.danhSachCumRapTheoHeThong.filter(
        (item) => {
          return item.tenCumRap == tenRapPhim
        }
      )
  
      console.log(this.rapPhim)
    }
    
  }

  handleChangeRap(maRap: any) {
    console.log(maRap.split(": ")[1])
    // this.scheduleForm.patchValue(
    //   {
    //     "maRap": maRap.split(": ")[1]
    //   }
    // )
  }

  createSchedule() {
    console.log(this.scheduleForm.value);

    // Xử lí format của kiểu ngày cần có dạng dd/MM/yyyy hh:mm:ss
    console.log(this.scheduleForm.controls.ngayChieuGioChieu) //2021-07-17T09:09
    const splitedFormat = this.scheduleForm.controls.ngayChieuGioChieu.value.split("T"); // ['2021-07-17', '09:09]
    let apiDate = this.datePipe.transform(splitedFormat[0], 'dd-MM-yyyy')
    apiDate = `${apiDate} ${splitedFormat[1]}:00`;
    
    const dataObj = {
      "maPhim": this.scheduleForm.controls.maPhim.value,
      "ngayChieuGioChieu": apiDate,
      "maRap": this.scheduleForm.controls.maRap.value,
      "giaVe": this.scheduleForm.controls.giaVe.value,
    }

    this.movieService.taoLichChieu(dataObj).subscribe(
      (response) => {
        console.log(response)
        window.alert("Movie schedule was created successfully!")
        this.modalService.dismissAll("Done")
      },
      (reject) => {
        console.log(reject)
        window.alert(reject.error)
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