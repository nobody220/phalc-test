<?php
use Phalcon\Mvc\View,
    Phalcon\Mvc\Controller;

class IndexController extends ControllerBase{

    public function testAction(){
        $this->view->setRenderLevel(View::LEVEL_ACTION_VIEW);
    }

    public function indexAction(){

    }

    public function activityAction(){
        $this->view->setRenderLevel(View::LEVEL_ACTION_VIEW);
    }

    public function authAction(){
        $this->view->setRenderLevel(View::LEVEL_ACTION_VIEW);
    }
    public function homeAction(){
        $this->view->setRenderLevel(View::LEVEL_ACTION_VIEW);
    }

    public function loginAction(){
        $this->view->disable();

        $request    =   $this->request;
        if($request->isPost()){
            $loginUser       =   $request->getJsonRawBody();
            $email           =   $loginUser->email;
            $password        =   $loginUser->password;

            if(strlen(trim($email)) == 0){
                $this->respond(array(
                    'statusCode'    =>  500,
                    'devMessage'    =>  "Email is empty"
                    ));
            }
            else if(strlen(trim($password)) == 0){
                $this->respond(array(
                    'statusCode'    =>  500,
                    'devMessage'    =>  "Password is empty"
                    ));
            }
            else{

                $users  =   TblUser::query()
                            ->where("email = ?1 ")
                            ->andWhere("password = ?2")
                            ->bind(array(
                                    1   =>  $email,
                                    2    => $password
                                ))
                            ->execute();

                if($users){
                    if($users->count() != 0){
                        foreach ($users as $user) {
                            // $this->session->destroy("username");
                            $this->session->set("username",$user->firstName . ' ' . $user->lastName);
                            $this->respond(array(
                                    'statusCode'        =>  200,
                                    'devMessage'        =>  array(
                                            'id'        =>  $user->id,
                                            'firstname' =>  $user->firstName,
                                            'lastname'  =>  $user->lastName,
                                            'email'     =>  $user->email,
                                            'session'   =>  $this->session->has('username'),
                                        )
                                ));
                        }
                    }
                    else{
                        $this->respond(array(
                            'statusCode'    => 200,
                            'devMessage'    => ""
                        ));
                    }
                }
                else{
                    foreach ($users->getMessages() as $error) {
                         $devMessage[]   =      $error->getMessages();
                    }
                    $this->respond(array(
                        'statusCode'    => 500,
                        'devMessage'    => $devMessage
                    ));
                }
            }
        }
        else{
            $this->respond(array(
                'statusCode'    =>  500,
                'devMessage'    =>  'Invalid Request'
            ));
        }
    }

    public function logoutAction(){
        $this->view->disable();
        $this->session->destroy();
    }

    public function setAction(){  //SET
        $this->view->disable();

        $request    =   $this->request;

        if($this->request->isPost()){

            $infos      =   $request->getJsonRawBody();
            $firstName  =   $infos->firstName;
            $lastName   =   $infos->lastName;
            $email      =   $infos->email;
            $password   =   $infos->password;
            $status     =   $infos->status;
            $openKey    =   $infos->openKey;

            // $firstName  =   $request->getPost('firstName');
            // $lastName   =   $request->getPost('lastName');
            // $email      =   $request->getPost('email');
            // $password   =   $request->getPost('password');
            // $openKey    =   $request->getPost('openKey');

            if(strlen(trim($firstName)) == 0){
                $this->respond(array(
                    'statusCode'    =>  500,
                    'devMessage'    =>  'First Name is Empty'
                ));
            }
            else if(strlen(trim($lastName)) == 0){
                $this->respond(array(
                    'statusCode'    =>  500,
                    'devMessage'    =>  'Last Name is Empty'
                ));
            }
            else if(strlen(trim($email)) == 0){
                $this->respond(array(
                    'statusCode'    =>  500,
                    'devMessage'    =>  'Email is Empty'
                ));
            }
            else if(strlen(trim($password)) == 0){
                $this->respond(array(
                    'statusCode'    =>  500,
                    'devMessage'    =>  'Password is Empty'
                ));
            }
            else if(strlen(trim($status)) == 0){
                $this->respond(array(
                    'statusCode'    =>  500,
                    'devMessage'    =>  'Status is Empty'
                ));
            }
            else{
                if($openKey == ""){
                    // echo "SAVE";

                    $users   =   new TblUser();
                    $users->firstName    =   $firstName;
                    $users->lastName     =   $lastName;
                    $users->email        =   $email;
                    $users->password     =   $password;
                    $users->status       =   $status;

                    if($users->create()){
                        $this->respond(array(
                            'statusCode'    =>  200,
                            'devMessage'    =>  'ok'
                        ));
                    }
                    else{
                        $devMessage = [];
                        foreach ($users->getMessages() as $error) {
                            $devMessage[] = $error->getMessages();
                        }

                        $this->respond(array(
                            'statusCode'    =>  500,
                            'devMessage'    =>  $devMessage
                        ));
                    }
                }
                else{
                    // echo "UPDATE";

                    $update     =   TblUser::findFirst("id = ".$openKey);
                    if($update){
                        $update->firstName    =   $firstName;
                        $update->lastName     =   $lastName;
                        $update->email        =   $email;
                        $update->password     =   $password;
                        $update->status       =   $status;

                        if($update->update()){
                            $this->respond(array(
                                'statusCode'    =>  200,
                                'devMessage'    =>  'ok'
                            ));
                        }
                        else{
                            $devMessage  =  [];
                            foreach ($users->getMessages() as $error) {
                                $devMessage[]   =   $error->getMessages();
                            }
                            $this->respond(array(
                                'statusCode'    =>  500,
                                'devMessage'    =>  $devMessage
                            ));
                        }
                    }
                    else{
                        $this->respond(array(
                            'statusCode'    =>  500,
                            'devMessage'    =>  'No Record Found'
                        ));
                    }
                }
            }
        }
        else{
            $this->respond(array(
                'statusCode'    =>  500,
                'devMessage'    =>  'Invalid Request'
            ));
        }
    }

    public function getAction(){    //GET
        $this->view->disable();

        $users  =   TblUser::query()
                    ->order("id DESC")
                    ->execute();

        $data   =   [];
        if($users){
            if($users->count() != 0){
                foreach ($users as $user) {
                    $data[] =   array(
                        'id'        => $user->id,
                        'lastName'  => $user->lastName,
                        'firstName' => $user->firstName,
                        'email'     => $user->email,
                        'password'  => $user->password,
                        'status'    => $user->status
                    );
                }

                $this->respond(array(
                    'statusCode'    =>  200,
                    'devMessage'    =>  $data
                ));
            }
            else{
                $this->respond(array(
                    'statusCode'    =>  200,
                    'devMessage'    =>  ''
                ));
            }
        }
        else{
            $devMessage =   [];
            foreach ($users->getMessages() as $error) {
                $devMessage[]   =   $error->getMessages();
            }
            $this->respond(array(
                'statusCode'    =>  500,
                'devMessage'    =>  $devMessage
            ));
        }

        // if($endUser == 'admin'){
        //     // echo "Admin not Available";

        //     $users   =   TblTrial::query()->execute();

        //     if($users){
        //         if($users->count() != 0){
        //             foreach ($users as $user) {
        //                 echo $user->lastName.', '.$user->firstName.'<br>';
        //             }
        //         }
        //         else{
        //             echo 'No Result';
        //         }
        //     }
        //     else{
        //         foreach ($users->getMessages() as $error) {
        //             echo $error;
        //         }
        //     }
        // }
        // else if($endUser == 'guest'){
        //     $users   =   TblUser::query()->execute();

        //     if($users){
        //         if($users->count() != 0){
        //             foreach ($users as $user) {
        //                 echo $user->lastName.', '.$user->firstName.'<br>';
        //             }
        //         }
        //         else{
        //             echo 'No Result';
        //         }
        //     }
        //     else{
        //         foreach ($users->getMessages() as $error) {
        //             echo $error;
        //         }
        //     }
        // }
        // else{
        //     echo "Invalid User";
        // }
    }

    public function getInfoAction($param){    //GET INFO
        $this->view->disable();

        $user  =   TblUser::findFirst("id = ".$param);

        if($user){
            // echo $user->firstName."<br>";
            // echo $user->lastName."<br>";

            $this->respond(array(
                'statusCode'    =>  200,
                'devMessage'    =>  array(
                        'firstName'       =>  $user->firstName,
                        'lastName'        =>  $user->lastName,
                        'email'           =>  $user->email,
                        'password'        =>  $user->password,
                        'selectStatus'    =>  $user->status
                    )
            ));
        }
        else{
            $this->respond(array(
                'statusCode'    =>  500,
                'devMessage'    =>  'Not Found'
            ));
        }
    }

    public function deleteAction(){     // DELETE
        $this->view->disable();

        $request    =   $this->request;
        // $lists      =   $request->getPost('list');                                           //PAG GET POST
        $lists  =   $request->getJsonRawBody();
        if($this->request->isPost()){
            // if(is_array($lists)){                                                            //PAG GET POST

                $result       =   0;
                // foreach ($lists as $list) {                                                  //PAG GET POST
                foreach ($lists->list as $list) {
                    // $delete   =   TblUser::findFirst("id = ".$list['key']);                  //PAG GET POST
                    $delete   =   TblUser::findFirst("id = ".$list->key);

                    if($delete){
                        if($delete->delete()){
                            $result     =  1;
                        }
                    }
                }

                if($result ==  1){
                    $this->respond(array(
                        'statusCode'    =>  200,
                        'devMessage'    =>  'ok'
                    ));
                }
                else{
                    $this->respond(array(
                        'statusCode'    =>  500,
                        'devMessage'    =>  'Delete Failed'
                    ));
                }
            // }
        }
        else{
            $this->respond(array(
                'statusCode'    =>  500,
                'devMessage'    =>  'Invalid Request'
            ));
        }

        // $delete   =   TblUser::findFirst("id = ".$key);

        // if($delete){
        //     if($delete->delete()){
        //         // echo "Record with ID no. ".$key." has been Deleted";

        //         $this->respond(array(
        //             'statusCode'    =>  200,
        //             'devMessage'    =>  'ok'
        //         ));
        //     }
        //     else{
        //         // echo "Failed to delete record no. ".$key;

        //         $this->respond(array(
        //             'statusCode'    =>  500,
        //             'devMessage'    =>  'Failed to Delete Record'
        //         ));
        //     }
        // }
        // else{
        //     // echo "Not Found";

        //     $this->respond(array(
        //         'statusCode'    =>  500,
        //         'devMessage'    =>  'No Record Found'
        //     ));
        // }
    }

    public function searchAction($search){  //SEARCH
        $this->view->disable();
        $users  =   TblUser::query()
                    ->where("lastName LIKE ?1")
                    // ->orwhere("lastname LIKE ?1")
                    -> bind(array(
                        1 => '%'.$search.'%'
                    ))->execute();
        $data   =   [];

         if($users){
            if($users->count() != 0){
                foreach ($users as $user) {
                    // echo $user->lastName.', '.$user->firstName.'<br>';

                    $data[] =   array(
                        'id'        => $user->id,
                        'lastName'  => $user->lastName,
                        'firstName' => $user->firstName,
                        'email'     => $user->email,
                        'password'  => $user->password
                    );
                }

                $this->respond(array(
                    'statusCode'    =>  200,
                    'devMessage'    =>  $data
                ));
            }
            else{
                // echo 'No Result';
                $this->respond(array(
                    'statusCode'    =>  200,
                    'devMessage'    =>  ''
                ));
            }
        }
        else{
            // foreach ($users->getMessages() as $error) {
            //     echo $error;
            // }

            $this->respond(array(
                'statusCode'    =>  500,
                'devMessage'    =>  'Invalid User'
            ));
        }
    }

    public function filterAction($search){  //SEARCH
        $this->view->disable();
        $users  =   TblUser::query()
                    ->where("status LIKE ?1")
                    -> bind(array(
                        1 => '%'.$search.'%'
                    ))->execute();
        $data   =   [];

         if($users){
            if($users->count() != 0){
                foreach ($users as $user) {
                    // echo $user->lastName.', '.$user->firstName.'<br>';

                    $data[] =   array(
                        'id'        => $user->id,
                        'lastName'  => $user->lastName,
                        'firstName' => $user->firstName,
                        'email'     => $user->email,
                        'password'  => $user->password,
                        'status'    => $user->status
                    );
                }

                $this->respond(array(
                    'statusCode'    =>  200,
                    'devMessage'    =>  $data
                ));
            }
            else{
                // echo 'No Result';
                $this->respond(array(
                    'statusCode'    =>  200,
                    'devMessage'    =>  ''
                ));
            }
        }
        else{
            // foreach ($users->getMessages() as $error) {
            //     echo $error;
            // }

            $this->respond(array(
                'statusCode'    =>  500,
                'devMessage'    =>  'Invalid User'
            ));
        }
    }

}
