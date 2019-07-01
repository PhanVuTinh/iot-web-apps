$(document).ready(function() {
    /*ĐỊNH NGHĨA ĐỂ XÉT TRƯỜNG HỢP CHƯA CHỌN SELECT*/
    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        }
    });
    $.validator.addMethod("valueNotEquals", function(value, element, arg) {
        return arg != value;
    }, "Value must not equal arg.");
    $.validator.addMethod("isEmail", function(value, element) {
        if (/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)) {
            return true;
        } else {
            return false;
        };
    }, "Email không hợp lệ");
    /*Check cập nhật thông tin cá nhân*/
    //chua check email ngay sinh
    $("#frmCNTTCaNhan").validate({
        /*Chưa check birthday*/
        rules: {
            user_fullName: {
                required: true,
                minlength: 1,
                maxlength: 50,
            },
            user_address: {
                maxlength: 500,
            },
            user_phone: {
                required: true,
                minlength: 9,
                maxlength: 15,
            },
            user_email: {
                maxlength: 100,
                isEmail: true,
            },
        },
        messages: {
            user_fullName: {
                required: 'Họ tên không được rỗng',
                minlength: 'Họ tên phải có ít nhất 1 kí tự',
                maxlength: 'Họ tên không được vượt quá 50 kí tự',
            },
            user_address: {
                maxlength: 'Địa chỉ không được vượt quá 500 kí tự',
            },
            user_phone: {
                required: 'Số điện thoại không được rỗng',
                minlength: 'Số điện thoại có ít nhất 9 kí tự',
                maxlength: 'Số điện thoại không được vượt quá 15 kí tự',
            },
            user_email: {
                maxlength: 'Email không được vượt quá 100 kí tự',
                isEmail: 'Email không hợp lệ',
            },
        },
        errorPlacement: function($error, $element) {
            var name = $element.attr("name");
            $("#error" + name).append($error);
        }
    });
    /*Looài thả nuôi*/
    $("#frmLoaiThaNuoi").validate({
        rules: {
            species_name: {
                required: true,
                minlength: 3,
                maxlength: 50,
            },
        },
        messages: {
            species_name: {
                required: 'Tên loài không được rỗng.',
                minlength: "Tên loài phải có ít nhất 3 kí tự",
                maxlength: 'Tên loài không được nhiều hơn 50 kí tự',
            },
        },
        errorPlacement: function($error, $element) {
            var name = $element.attr("name");
            $("#error" + name).append($error);
        }
    });
    /*Ao*/
    $("#frmAo").validate({
        rules: {
            pond_width: {
                range: [1, 5000],
                number: true,
            },
            pond_height: {
                range: [1, 5000],
                number: true,
            },
            pond_depth: {
                range: [1, 60],
                number: true,
            },
            pond_address: {
                minlength: 10,
                maxlength: 255,
            },
            pond_location: {
                minlength: 4,
                maxlength: 30,
            },
            region_id: {
                valueNotEquals: "-1",
            },
            pond_description: {
                required: true,
                minlength: 10,
                maxlength: 1024,
            },
            pond_latitude: {
                required: true,
                number: true,
            },
            pond_longitude: {
                required: true,
                number: true,
            }
        },
        messages: {
            pond_width: {
                range: "Dữ liệu không hợp lệ",
                number: "Vui lòng nhập số",
            },
            pond_height: {
                range: "Dữ liệu không hợp lệ",
                number: "Vui lòng nhập số",
            },
            pond_depth: {
                range: "Dữ liệu không hợp lệ",
                number: "Vui lòng nhập số",
            },
            pond_address: {
                minlength: "Mô tả về ao phải có ít nhất 10 kí tự",
                maxlength: 'Mô tả về ao không được nhiều hơn 255 kí tự',
            },
            pond_location: {
                minlength: "Vị trị của ao phải có ít nhất 5 kí tự",
                maxlength: "Vị trị của ao không được nhiều hơn 30 kí tự",
            },
            region_id: {
                valueNotEquals: "Vui lòng chọn vùng",
            },
            user_id: {
                valueNotEquals: "Vui lòng chọn chủ sở hữu",
            },
            pond_description: {
                required: "Mô tả về ao không được rỗng",
                minlength: "Mô tả về ao phải có ít nhất 10 kí tự",
                maxlength: "Mô tả về ao không được nhiều hơn 1024 kí tự",
            },
            pond_latitude: {
                required: "Vui lòng nhập kinh độ của ao",
                number: "Vui lòng nhập số",
            },
            pond_longitude: {
                required: "Vui lòng nhập vĩ độ của ao",
                number: "Vui lòng nhập số",
            }
        },
        errorPlacement: function($error, $element) {
            var name = $element.attr("name");
            $("#error" + name).append($error);
        }
    });
    /*Chuẩn bị ao*/
    $("#frmPreparpond").validate({
        rules: {
            pond_id: {
                valueNotEquals: "-1",
            },
            stocking_id: {
                valueNotEquals: "-1",
            },
            dophdat_id: {
                range: [1, 20],
                number: true,
            },
            hinhthuccaitao_id: {
                required: true,
                minlength: 5,
                maxlength: 50,
            },
            congsuatquatnuoc_id: {
                range: [1, 5000],
                number: true,
            },
            socanhquatmay_id: {
                number: true,
                range: [1, 500],
            }
        },
        messages: {
            pond_id: {
                valueNotEquals: "Vui lòng chọn ao",
            },
            stocking_id: {
                valueNotEquals: "Vui lòng chọn vụ thả",
            },
            dophdat_id: {
                range: "Dữ liệu không hợp lệ",
                number: "Vui lòng nhập số",
            },
            hinhthuccaitao_id: {
                required: "Vui lòng nhập hình thức cải tạo",
                minlength: "Phải trên 5 kí tự",
                maxlength: "Không được nhiều hơn 50 kí tự",
            },
            congsuatquatnuoc_id: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            socanhquatmay_id: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            }
        },
        errorPlacement: function($error, $element) {
            var name = $element.attr("name");
            $("#error" + name).append($error);
        }
    });
    /*chuẩn bị vật liệu*/
    $("#frmCapNhatVatLieu").validate({
        rules: {
            matepredetail_date: {
                required: true,
            },
            matepredetail_quantity: {
                required: true,
                number: true,
            },
            matepredetail_number: {
                required: true,
                number: true,
            },
            matepredetail_note: {
                required: true,
            }
        },
        messages: {
            matepredetail_date: {
                required: "Vui lòng nhập số ngày",
            },
            matepredetail_quantity: {
                required: "Vui lòng nhập số lượng",
                number: "Vui lòng nhập số",
            },
            matepredetail_number: {
                required: "Vui lòng nhập số vật liệu",
                number: "Vui lòng nhập số",
            },
            matepredetail_note: {
                required: "Vui lòng nhập ghi chú",
            }
        },
        errorPlacement: function($error, $element) {
            var name = $element.attr("name");
            $("#error" + name).append($error);
        }
    });
    $("#frmStockPond").validate({
        rules: {
            pond_id_3: {
                required: true,
                valueNotEquals: "",
            },
            stocking_id_3: {
                required: true,
                valueNotEquals: "",
            },
            seed_id: {
                required: true,
                valueNotEquals: "",
            },
            stockpond_date: {
                required: true,
            },
            stockpond_PCR: {
                number: true,
                range: [0, 1],
            },
            stockpond_density: {
                number: true,
                range: [1, 22],
            },
            stockpond_quantityStock: {
                required: true,
                number: true,
            },
            stockpond_statusOfSeed: {
                number: true,
                range: [0, 1],
            },
            stockpond_depth: {
                number: true,
                range: [1, 60],
            },
            stockpond_clarity: {
                number: true,
                range: [25, 50],
            },
            stockpond_salinity: {
                number: true,
                range: [5, 35],
            },
            stockpond_DO: {
                number: true,
                range: [3, 5],
            },
            stockpond_PHwater: {
                number: true,
                range: [7, 9],
            },
            stockpond_tempAir: {
                number: true,
                range: [30, 45]
            },
            stockpond_tempWater: {
                number: true,
                range: [18, 33],
            },
            stockpond_state: {
                number: true,
                range: [0, 1],
            },
            stockpond_age: {
                number: true,
                range: [1, 100]
            }
        },
        messages: {
            pond_id_3: {
                required: "Vui lòng chọn ao",
            },
            stocking_id_3: {
                required: "Vui lòng chọn vụ",
            },
            seed_id: {
                required: "Vui lòng chọn giống",
            },
            stockpond_date: {
                required: "Vui lòng chọn ngày",
            },
            stockpond_PCR: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_density: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_quantityStock: {
                required: "Vui lòng nhập số lượng",
                number: "Vui lòng nhập số",
            },
            stockpond_statusOfSeed: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_depth: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_clarity: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_salinity: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_DO: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_PHwater: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_tempAir: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_tempWater: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_state: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_age: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            }
        },
        errorPlacement: function($error, $element) {
            var name = $element.attr("name");
            $("#error" + name).append($error);
        }
    });
    $("#frmTracker").validate({
        rules: {
            pond_id_2: {
                required: true,
                valueNotEquals: "",
            },
            stocking_id_2: {
                required: true,
                valueNotEquals: "",
            },
            trackeraugmented_number: {
                number: true,
                range: [1, 100],
            },
            trackeraugmented_date: {
                required: true,
            },
            trackeraugmented_age: {
                number: true,
                range: [1, 100],
            },
            trackeraugmented_densityAvg: {
                number: true,
            },
            trackeraugmented_weightAvg: {
                number: true,
                range: [1, 200]
            },
            trackeraugmented_speedOfGrowth: {
                number: true,
            },
            tracker_augmented_survival: {
                number: true,
                range: [1, 100],
            },
            trackeraugmented_biomass: {
                number: true,
            },
        },
        messages: {
            pond_id_2: {
                required: "Vui lòng chọn ao",
            },
            stocking_id_2: {
                required: "Vui lòng chọn vụ",
            },
            trackeraugmented_number: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            trackeraugmented_date: {
                required: "Vui lòng nhập ngày",
            },
            trackeraugmented_age: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            trackeraugmented_densityAvg: {
                number: "Vui lòng nhập số",
            },
            trackeraugmented_weightAvg: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            trackeraugmented_speedOfGrowth: {
                number: "Vui lòng nhập số",
            },
            tracker_augmented_survival: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            trackeraugmented_biomass: {
                number: "Vui lòng nhập số",
            },
        },
        errorPlacement: function($error, $element) {
            var name = $element.attr("name");
            $("#error" + name).append($error);
        }
    });
    /* cập nhật chuẩn bị ao*/
    $("#frmcnvl").validate({
        rules: {
            pondpreparation_dateStart: {
                required: true,
            },
            pondpreparation_soilPH: {
                number: true,
                range: [1, 14],
            },
            pondpreparation_capacityOfFan: {
                number: true,
            },
            pondpreparation_quantityOfFan: {
                number: true,
            }
        },
        messages: {
            pondpreparation_dateStart: {
                required: "Vui lòng nhập ngày",
            },
            pondpreparation_soilPH: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            pondpreparation_capacityOfFan: {
                number: "Vui lòng nhập số",
            },
            pondpreparation_quantityOfFan: {
                number: "Vui lòng nhập số",
            }
        },
        errorPlacement: function($error, $element) {
            var name = $element.attr("name");
            $("#error" + name).append($error);
        }
    });
    //cập nhật stockpond
    $("#frmcnthagiong").validate({
        rules: {
            stockpond_date: {
                required: true,
            },
            stockpond_age: {
                number: true,
                range: [1, 100]
            },
            stockpond_PCR: {
                number: true,
                range: [0, 1],
            },
            stockpond_PCRresult: {
                required: true,
            },
            stockpond_quantityStock: {
                required: true,
                number: true,
            },
            stockpond_density: {
                number: true,
                range: [1, 22],
            },
            stockpond_statusOfSeed: {
                number: true,
                range: [0, 1],
            },
            stockpond_method: {
                required: true,
            },
            stockpond_state: {
                number: true,
                range: [0, 1],
            },
            stockpond_depth: {
                number: true,
                range: [1, 60],
            },
            stockpond_clarity: {
                number: true,
                range: [25, 50],
            },
            stockpond_salinity: {
                number: true,
                range: [5, 35],
            },
            stockpond_DO: {
                number: true,
                range: [3, 5],
            },
            stockpond_PHwater: {
                number: true,
                range: [7, 9],
            },
            stockpond_tempAir: {
                number: true,
                range: [30, 45]
            },
            stockpond_tempWater: {
                number: true,
                range: [18, 33],
            },
        },
        messages: {
            stockpond_date: {
                required: "Vui lòng chọn ngày",
            },
            stockpond_PCR: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_PCRresult: {
                required: "Vui lòng nhập kết quả",
            },
            stockpond_density: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_quantityStock: {
                required: "Vui lòng nhập số lượng",
                number: "Vui lòng nhập số",
            },
            stockpond_statusOfSeed: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_method: {
                required: "Vui lòng nhập cách xử lí",
            },
            stockpond_depth: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_clarity: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_salinity: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_DO: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_PHwater: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_tempAir: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_tempWater: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_state: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            stockpond_age: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            }
        },
        errorPlacement: function($error, $element) {
            var name = $element.attr("name");
            $("#error" + name).append($error);
        }
    });
    // cập nhật tăng trưởng
    $("#frmupdatetracker").validate({
        rules: {
            trackeraugmented_number: {
                number: true,
                range: [1, 100],
            },
            trackeraugmented_date: {
                required: true,
            },
            trackeraugmented_age: {
                number: true,
                range: [1, 100],
            },
            trackeraugmented_densityAvg: {
                number: true,
            },
            trackeraugmented_weightAvg: {
                number: true,
                range: [1, 200]
            },
            trackeraugmented_speedOfGrowth: {
                number: true,
            },
            tracker_augmented_survival: {
                number: true,
                range: [1, 100],
            },
            trackeraugmented_biomass: {
                number: true,
            },
            trackeraugmented_note: {
                required: true,
                minlength: 1,
                maxlength: 1024,
            }
        },
        messages: {
            trackeraugmented_number: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            trackeraugmented_date: {
                required: "Vui lòng nhập ngày",
            },
            trackeraugmented_age: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            trackeraugmented_densityAvg: {
                number: "Vui lòng nhập số",
            },
            trackeraugmented_weightAvg: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            trackeraugmented_speedOfGrowth: {
                number: "Vui lòng nhập số",
            },
            tracker_augmented_survival: {
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            trackeraugmented_biomass: {
                number: "Vui lòng nhập số",
            },
            trackeraugmented_note: {
                required: "Vui lòng nhập ghi chú",
                minlength: "Ghi chú phải nhiều hơn 1 kí tự",
                maxlength: "Ghi chú phải ít hơn 1024 kí tự",
            }
        },
        errorPlacement: function($error, $element) {
            var name = $element.attr("name");
            $("#error" + name).append($error);
        }
    });
    /* cập nhật thu hoạch*/
    $("#frmUpdateHavestDetail").validate({
        rules: {
            harvest_harvestDate: {
                required: true,
            },
            harvedeta_weight: {
                required: true,
                number: true,
            },
            harvedeta_price: {
                required: true,
                number: true,
            },
            harvedeta_note: {
                required: true,
                minlength: 1,
                maxlength: 1024
            }
        },
        messages: {
            harvest_harvestDate: {
                required: "Vui lòng nhập ngày",
            },
            harvedeta_weight: {
                required: "Vui lòng nhập số lượng",
                number: "Vui lòng nhập số",
            },
            harvedeta_price: {
                required: "Vui lòng nhập giá",
                number: "Vui lòng nhập số",
            },
            harvedeta_note: {
                required: "Vui lòng nhập ghi chú",
                minlength: "Ghi chú phải nhiều hơn 1 kí tự",
                maxlength: "Ghi chú phải ít hơn 1024 kí tự",
            }
        },
        errorPlacement: function($error, $element) {
            var name = $element.attr("name");
            $("#error" + name).append($error);
        }
    });
    /*chi tiết thu hoạch (tích hợp)*/
    $("#frmHarvestDetail").validate({
        rules: {
            pond_id: {
                required: true,
            },
            harvest_id: {
                required: true,
            },
            harvedeta_number: {
                required: true,
                number: true,
                range: [1, 200],
            },
            prodtype_id: {
                required: true,
            },
            unit_id: {
                required: true,
            },
            harvedeta_price: {
                required: true,
                number: true,
                range: [1, 100000000],
            },
            harvedeta_weight: {
                required: true,
                number: true,
                range: [1, 100000000],
            }
        },
        messages: {
            pond_id: {
                required: "Vui lòng chọn ao",
            },
            harvest_id: {
                required: "Vui lòng chọn ngày",
            },
            harvedeta_number: {
                required: "Vui lòng nhập số lần",
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            prodtype_id: {
                required: "Vui lòng chọn kích cỡ",
            },
            unit_id: {
                required: "Vui lòng chọn đơn vị tính",
            },
            harvedeta_price: {
                required: "Vui lòng nhập giá",
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            },
            harvedeta_weight: {
                required: "Vui lòng nhập trọng lượng",
                number: "Vui lòng nhập số",
                range: "Dữ liệu không hợp lệ",
            }
        },
        errorPlacement: function($error, $element) {
            var name = $element.attr("name");
            $("#error" + name).append($error);
        }
    });
}); // end document.ready