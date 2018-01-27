<?php
// ini_set("display_errors","on");
print_r($_FILES);
var_dump(move_uploaded_file($_FILES['file']['tmp_name'],'F:/ziliao/study/ganhuo/upload_file/image/'.date("YmdHis") . '_' . mt_rand(10000, 99999) .'.jpg'));