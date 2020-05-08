
var $ = jQuery.noConflict();

$( document ).ready(function() {

    $("#billing_love_code").val("");            // 捐贈碼
    $("#billing_customer_identifier").val("");      // 統一編號
    $("#billing_carruer_num").val("");              // 載具編號
    $("#billing_carruer_type").val("1");            // 載具類別
    $("#billing_invoice_type").val("p");            // 發票開立類型

    $("#billing_customer_identifier_field").hide();
    $("#billing_love_code_field").hide();
    $("#billing_carruer_num_field").hide();
    $("#billing_carruer_type_field").show();

    $("#billing_invoice_type").change(function() {

        invoice_type = $("#billing_invoice_type").val();

        if (invoice_type == 'p') {

            $("#billing_customer_identifier_field").hide();
            $("#billing_love_code_field").hide();
            $("#billing_carruer_type_field").show();

            $("#billing_customer_identifier").val("");
            $("#billing_love_code").val("");

        } else if (invoice_type == 'c') {

            $("#billing_customer_identifier_field").show();
            $("#billing_love_code_field").hide();
            $("#billing_carruer_num_field").hide();
            $("#billing_carruer_type_field").hide();

            $("#billing_carruer_num").val("");
            $("#billing_love_code").val("");
            $("#billing_carruer_type").val("0");

        } else if (invoice_type == 'd') {

            $("#billing_customer_identifier_field").hide();
            $("#billing_love_code_field").show();
            $("#billing_carruer_num_field").hide();
            $("#billing_carruer_type_field").hide();

            $("#billing_customer_identifier").val("");
            $("#billing_carruer_num").val("");
            $("#billing_carruer_type").val("0");

            if($("#billing_love_code").val() == '') {
                 $("#billing_love_code").val("168001");            // 捐贈碼
            }
        }
    });

    // 載具類別判斷
    $("#billing_carruer_type").change(function() {

        carruer_type = $("#billing_carruer_type").val();
        invoice_type = $("#billing_invoice_type").val();
        identifier = $("#billing_customer_identifier").val();

        // 無載具
        if (carruer_type == '0' || carruer_type == '1') {

            $("#billing_carruer_num_field").hide();
            $("#billing_carruer_num").val("");

        } else if (carruer_type == '2') {

            $("#billing_carruer_num_field").show();

        } else if (carruer_type == '3') {

            $("#billing_carruer_num_field").show();
        }
    });

    // 若有 billing_memo 則將此攔放到最後 (移除重新加入)
    let parent_billing = $("#billing_memo_field").parent();
    parent_billing.append($("#billing_memo_field"));

    // 載具類別 : 新增客製化顯示字串
    $("#billing_carruer_type_field").append('<p id="carruer_hint" style="color:#f33; font-size: 12px;">為響應政府無紙化作業，我們將優先提供雲端發票。若您的發票中獎，我們將另行通知並協助您取得紙本發票。若您需要索取紙本發票，請於備註填寫您的需求，並留下寄送地址，以便寄送紙本發票給您</p>');
    $("#billing_carruer_type").change(function() {
        let invoice_type = $("#billing_carruer_type").val();
        if (invoice_type == '1') {
            $('#carruer_hint').show();
        } else {
            $('#carruer_hint').hide();
        }
    });

    // 如果沒有付款方式, 則將發票相關欄位移除
    if ($('#payment ul').length == 0) {
        $('#billing_invoice_type_field').remove();
        $('#billing_carruer_type_field').remove();
        $('#billing_customer_identifier_field').remove();
        $('#billing_love_code_field').remove();
        $('#billing_carruer_num_field').remove();
    }
});
