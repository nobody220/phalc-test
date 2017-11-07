<?php
use Phalcon\Mvc\View,
    Phalcon\Mvc\Controller;

class TrainingController extends ControllerBase{

    public function beforeExecuteRoute($dispatcher){
        
    }

    public function indexAction(){
        
    }

    // public function setAction(){
    // 	$this->view->disable();

    // 	$users	=	new TblDetail();
    // 	$users->address 	=	'Caloocan City';

    // 	if($users->create()){
    // 		echo "Detail Inserted";
    // 	}
    // 	else{
    // 		foreach ($users->getMessages() as $user) {
    // 			echo $user;
    // 		}
    // 	}
    // }

    // public function getAction(){
    // 	$this->view->disable();

    // 	$users	=	TblDetail::query()->execute();

    // 	if($users){
    // 		if($users->count() > 0){
    // 			foreach ($users as $user) {
    // 				echo $user->address;
    // 			}
    // 		}
    // 		else{
    // 			echo "Not Found";
    // 		}
    // 	}
    // 	else{
    // 		foreach ($users->getMessages() as $error) {
    // 			echo $error."<br>";
    // 		}
    // 	}
    // }

    // public function deleteAction($key){
    // 	$this->view->disable();

    // 	$user	=	TblDetail::findFirst("id = ".$key);

    // 	if($user){
    // 		if($user->delete()){
    // 			echo "Record with ID no. ".$key." has been Deleted";
    // 		}
    // 		else{
    // 			echo "Failed to delete record no. ".$key;
    // 		}
    // 	}
    // 	else{
    // 		foreach ($user->getMessages as $error) {
    // 			echo $error."<br>";
    // 		}
    // 	}
    // }

    // public function searchAction($location){
    // 	$this->view->disable();

    // 	$detail		=	TblDetail::query()
    // 					->where("address LIKE ?add")
    // 					->bind(array(
    // 						add => '%'.$location.'%'
    // 					))->execute();

    // 	if($detail){
    // 		if($detail->count() > 0){
    // 			foreach ($detail as $info) {
    // 				echo $info."<br>";
    // 			}
    // 		}
    // 		else{
    // 			echo "Not Record Found";
    // 		}
    // 	}
    // 	else{
    // 		foreach ($detail->getMessages as $error) {
    // 			echo $error."<br>";
    // 		}
    // 	}
    // }
}