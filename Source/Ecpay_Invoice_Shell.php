<?php
// SDK外殼，用來處理WooCommerce相容性問題

include_once('Ecpay_Invoice.php');

final class ECPay_Woo_EcpayInvoice extends EcpayInvoice
{
    function Check_Out() {
        $arParameters = array_merge( array('MerchantID' => $this->MerchantID) , array('TimeStamp' => $this->TimeStamp), $this->Send);
        return $arFeedback = Ecpay_Woo_Invoice_Send::CheckOut($arParameters, $this->HashKey, $this->HashIV, $this->Invoice_Method, $this->Invoice_Url);
    }
}

class Ecpay_Woo_Invoice_Send extends ECPay_Invoice_Send
{
    /**
     * Server Post
     *
     * @param     array    $Params        Post 參數
     * @param     string   $ServiceURL    Post URL
     * @return    void
     */
    public static function ServerPost($parameters ,$ServiceURL) {

        $sSend_Info = '' ;

        // 組合字串
        foreach($parameters as $key => $value) {
            
            if( $sSend_Info == '') {
                $sSend_Info .= $key . '=' . $value ;
            }  else {
                $sSend_Info .= '&' . $key . '=' . $value ;
            }
        }

        // $fields_string = http_build_query($Params);
        $rs = wp_remote_post($ServiceURL, array(
            'method'      => 'POST',
            'headers'     => false,
            'httpversion' => '1.0',
            'sslverify'   => true,
            'body'        => $sSend_Info
        ));

        if ( is_wp_error($rs) ) {
            throw new Exception($rs->get_error_message());
        }

        return $rs['body'];
    }
}