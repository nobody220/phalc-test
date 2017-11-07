<?php
    class TblUser extends \Phalcon\Mvc\Model{
        public function getSource(){
            return 'tbl_user';
        }
        public static function find($parameters = null){
            return parent::find($parameters);
        }
        public static function findFirst($parameters = null){
            return parent::findFirst($parameters);
        }
    }
