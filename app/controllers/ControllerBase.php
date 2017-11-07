<?php
    use Phalcon\Mvc\Controller;

    class ControllerBase extends Controller{
        protected function respond($devMessage){
            $this->response->setStatusCode(200, "Ok")->sendHeaders();
            echo json_encode($devMessage);
        }
    }
