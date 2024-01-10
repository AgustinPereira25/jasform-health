<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

use Domain\Users\Models\User;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'first_name'=>'Angela',
                'last_name'=>'Smith',
                'photo'=>'NA',
                'phone'=>'949-977-9865',
                'position_in_organization'=>'Web designer',
                'status'=>'Active',
                'email'=>'AngelaLSmith@armyspy.com',
                'email_verified_at' => Carbon::now(),
                'password'=>Hash::make('oWahgae3'),
                'remember_token'=>'5f4971dd-b298-43e2-852a-e59be023b210',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id'=>1
            ],
            [
                'first_name'=>'Scott',
                'last_name'=>'Dowler',
                'photo'=>'NA',
                'phone'=>'513-406-0528',
                'position_in_organization'=>'Patient educator',
                'status'=>'Inactive',
                'email'=>'ScottSDowler@rhyta.com',
                'email_verified_at' => Carbon::now(),
                'password'=>Hash::make('caiNg5Sou2oo'),
                'remember_token'=>'0fe46fb3-eadf-4088-b97d-9899b3591166',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id'=>2
            ],
            [
                'first_name'=>'Nolan',
                'last_name'=>'Longnecker',
                'photo'=>'NA',
                'phone'=>'775-296-5109',
                'position_in_organization'=>'Atmospheric scientist',
                'status'=>'Active',
                'email'=>'NolanMLongnecker@dayrep.com',
                'email_verified_at' => Carbon::now(),
                'password'=>Hash::make('Nie8xielie'),
                'remember_token'=>'f7cced39-b7d0-4367-b9a4-45ccd3340747',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id'=>1
            ],
            [
                'first_name'=>'Dustin',
                'last_name'=>'Gentry',
                'photo'=>'NA',
                'phone'=>'347-328-6917',
                'position_in_organization'=>'Health care interpreter',
                'status'=>'Active',
                'email'=>'DustinKGentry@teleworm.us',
                'email_verified_at' => Carbon::now(),
                'password'=>Hash::make('dei4XaeN5oh'),
                'remember_token'=>'af13ca6e-be50-4941-94a6-8dde93616371',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id'=>2
            ],
            [
                'first_name'=>'Bertha',
                'last_name'=>'McDavid',
                'photo'=>'NA',
                'phone'=>'305-782-4470',
                'position_in_organization'=>'Tax examiner',
                'status'=>'Active',
                'email'=>'BerthaDMcDavid@dayrep.com',
                'email_verified_at' => Carbon::now(),
                'password'=>Hash::make('Oongox2vei'),
                'remember_token'=>'3bac89e9-64dc-4a46-833a-4bb3314a0049',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id'=>3
            ]
        ]);
        DB::table('roles')->insert([
            [
                'name'=>'Admin',
                'description'=>'Administrative tasks',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name'=>'Editor',
                'description'=>'Editor tasks',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name'=>'ReadOnly',
                'description'=>'Read only tasks',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);
        DB::table('user_role')->insert([
            [
                'user_id'=>1,
                'role_id'=>1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'user_id'=>2,
                'role_id'=>1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'user_id'=>3,
                'role_id'=>2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'user_id'=>4,
                'role_id'=>3,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id'=>5,
                'role_id'=>2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);
    }
}
