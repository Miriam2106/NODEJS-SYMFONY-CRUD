<?php

namespace App\Controller;
header('Access-Control-Allow-Origin: *');

use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EmployeesController extends AbstractController
{
    public function findEmployees()
    {
        $em = $this->getDoctrine()->getManager();
        $query = $em -> createQuery('SELECT e.id, e.name, e.address, e.salary, e.registered, e.updated, e.status, IDENTITY(e.idOffice) idOffice FROM App:Employee e');
        $listEmployees = $query -> getResult();
        $data = [
            'status'=> 404,
            'message'=>'No se encontraron resultados'
        ];
        if(count($listEmployees) > 0){
            $data = [
                'status'=> 200,
                'message'=>'Se encontraron '. count($listEmployees).' resultados.',
                'listEmployees' => $listEmployees
            ];
        }
        return new JsonResponse($data);
    }

    public function findEmployeeById($id){
        $em = $this->getDoctrine()->getManager();
        $query = $em -> createQuery('SELECT e.id, e.name, e.address, e.salary, e.registered, e.updated, e.status, IDENTITY(e.idOffice) idOffice FROM App:Employee e WHERE e.id=:p');
        $query->setParameter(':p',$id);
        $employee = $query->getResult();
        $data = [
            'status'=> 404,
            'message'=>'No se ha encontrado el empleado'
        ];
        if(count($employee) > 0){
            $data = [
                'status'=> 200,
                'message'=>'Se ha encontrado el empleado',
                'employee' => $employee
            ];
        }
        return new JsonResponse($data);
    }

    public function createEmployee(Request $request){
        $em = $this->getDoctrine()->getManager();

        $name = $request->get('name',null);
        $address = $request->get('address',null);
        $salary = $request->get('salary',null);
        $id_office = $request->get('idOffice',null);
        $office = new \App\Entity\Office();
        $office->setId($id_office);

        $employee = new \App\Entity\Employee();
        $employee->setName($name);
        $employee->setAddress($address);
        $employee->setSalary($salary);
        $employee->setIdOffice($office);
        $employee->setStatus(1);
        $dataTime = new DateTime('NOW');
        $employee->setRegistered($dataTime);
        $employee->setUpdated($dataTime);

        $em -> merge($employee);
        $em ->flush();

        $data = [
            'status'=> 200,
            'message'=>'Se ha creado el empleado correctamente'
        ];
        return new JsonResponse($data);
    }

    public function updateEmployee(Request $request){
        $em = $this->getDoctrine()->getManager();

        $name = $request->get('name',null);
        $address = $request->get('address',null);
        $salary = $request->get('salary',null);
        $id = $request->get('id',null);
        $id_office = $request->get('id_office',null);

        $query = $em -> createQuery('UPDATE App:Employee e SET e.name = :name, e.address= :address, e.salary= :salary , e.updated= :updated,  e.idOffice = :idOffice WHERE e.id= :p');
        $query->setParameter(':name',$name);
        $query->setParameter(':address',$address);
        $query->setParameter(':salary',$salary);
        $query->setParameter(':idOffice',$id_office);
        $dateTime = new DateTime('NOW');
        $query->setParameter(':updated',$dateTime);
        $query->setParameter(':p',$id);
        $flag = $query->getResult();

        if($flag ==1){
            $data = [
                'status'=> 200,
                'message'=>'Se ha modificado el empleado correctamente'
            ];
        }else{
            $data = [
                'status'=> 404,
                'message'=>'No se ha modificado el empleado'
            ];
        }
        return new JsonResponse($data);
    }

    public function deleteEmployee($id){
        $em = $this->getDoctrine()->getManager();
        $query = $em -> createQuery('UPDATE App:Employee e SET e.status = 0 WHERE e.id =:p');
        $query->setParameter(':p',$id);
        $flag = $query->getResult();
        if($flag==1){
            $data = [
                'status'=> 200,
                'message'=>'Se ha desactivado el empleado'
            ];
        }else{
            $data = [
                'status'=> 200,
                'message'=>'No se ha desactivado el empleado correctamente'
            ];
        }
        return new JsonResponse($data);
    }
}
