
// 開立發票
function send_orderid_to_gen_invoice(nOrder_Id)
{
    var data = {
        'action': 'my_action',
        'oid': nOrder_Id
    };


    jQuery.blockUI({ message: null });
    // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
    jQuery.post(ajaxurl, data, function(response) {
        alert(response);
        location.reload();
    });

}

// 作廢發票
function send_orderid_to_issue_invalid(nOrder_Id)
{

    if(confirm("確定要刪除此筆發票"))
    {
        var data = {
            'action': 'my_action2',
            'oid': nOrder_Id
        };

        jQuery.blockUI({ message: null });

        jQuery.post(ajaxurl, data, function(response) {
            alert(response);
            location.reload();
        });
    }

}