function getUserFunctionGroup(conf, token, secu, userid, callback) {
    jQuery.ajax({
        url: conf + '/api/userfunctiongroup/getfunctiongroupbyuserid/' + userid,
        type: 'GET',
        headers: { 'Authorization': secu + token },
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata) {
            callback(resultdata.data);
        },
        error: function(jqXHR, error, errorThrown) {
            displayError("Lỗi ! Không thể tải danh sách nhóm chức năng của người dùng. Vui lòng tải lại trang");
        },
    });

}

function getUserFunction(conf, token, secu, userid, function_tag, callback) {
    jQuery.ajax({
        url: conf + '/api/userfunction/getfunctionbytag/' + userid + '/' + function_tag,
        type: 'GET',
        headers: { 'Authorization': secu + token },
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata) {
            callback(resultdata.data);
        },
        error: function(jqXHR, error, errorThrown) {
            displayError("Lỗi ! Không thể tải danh sách nhóm chức năng của người dùng. Vui lòng tải lại trang");
        },
    });

}

function getUserPagination(conf, token, secu, page, callback) {
    jQuery.ajax({
        url: conf + '/api/user/getshortpagi/?page=' + page + '&pageSize=5&keyword',
        type: 'GET',
        headers: { 'Authorization': secu + token },
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata) {
            callback(resultdata.data);
        },
        error: function(jqXHR, error, errorThrown) {
            displayError("Lỗi ! Không thể tải danh sách nhóm chức năng của người dùng. Vui lòng tải lại trang");
        }
    });

}

function getfriendlist(conf, token, secu, user_id, callback) {
    jQuery.ajax({
        url: conf + '/api/friend/getfriendlist/' + user_id,
        type: 'GET',
        headers: { 'Authorization': secu + token },
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata) {
            callback(resultdata.data);
        },
        error: function(jqXHR, error, errorThrown) {
            displayError("Lỗi ! Không thể tải danh sách nhóm chức năng của người dùng. Vui lòng tải lại trang");
        },
    })
}
// Người dùng farmer sử dụng qui ước đặt biến khác với các người dùng còn lại
function getfriendlistforfarmer(conf, token, user_id, callback) {
    jQuery.ajax({
        url: conf + '/api/friend/getfriendlist/' + user_id,
        type: 'GET',
        headers: { 'Authorization': token },
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata) {
            callback(resultdata.data);
        },
        error: function(jqXHR, error, errorThrown) {
            displayError("Lỗi ! Không thể tải danh sách nhóm chức năng của người dùng. Vui lòng tải lại trang");
        },
    })
}

function getChatGroupList(conf, token,secu, user_id, callback) {
    jQuery.ajax({
        url: conf + '/api/chatgroup/getallbyuserid/' + user_id,
        type: 'GET',
        headers: { 'Authorization':secu + token },
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata) {
            callback(resultdata.data);
        },
        error: function(jqXHR, error, errorThrown) {
            displayError("Lỗi ! Không thể tải danh sách nhóm chức năng của người dùng. Vui lòng tải lại trang");
        },
    })
}

function getChatGroupListforFarmer(conf, token, user_id, callback) {
    jQuery.ajax({
        url: conf + '/api/chatgroup/getallbyuserid/' + user_id,
        type: 'GET',
        headers: { 'Authorization': token },
        contentType: 'application/json; charset=utf-8',
        success: function(resultdata) {
            callback(resultdata.data);
        },
        error: function(jqXHR, error, errorThrown) {
            displayError("Lỗi ! Không thể tải danh sách nhóm chức năng của người dùng. Vui lòng tải lại trang");
        },
    })
}