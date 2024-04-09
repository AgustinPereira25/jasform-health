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
        DB::table('roles')->insert([
            [
                'name' => 'Admin',
                'description' => 'Administrative tasks',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Creator',
                'description' => 'Creator tasks',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);

        DB::table('users')->insert([
            [
                'first_name' => 'Admin',
                'last_name' => 'JASForm',
                'photo' => 'https://jasform-pub.s3.us-west-2.amazonaws.com/jasformavataradmin.png',
                'position_in_org' => 'Administrator',
                'is_active' => true,
                'email' => 'admin@jasform.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Ch345st8-Sys$4ome-Ashy'),
                'remember_token' => '3bac89e9-64dc-4a46-833a-4bb3314a0047',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 1,
                'role_id' => 1
            ],
            [
                'first_name' => 'LightIt',
                'last_name' => 'Labs',
                'photo' => 'https://jasform-pub.s3.us-west-2.amazonaws.com/LightIt.png',
                'position_in_org' => 'Lab',
                'is_active' => true,
                'email' => 'lightit@yopmail.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Che3ist8-Syndrome-Ashy'),
                'remember_token' => '0fe46fb3-eadf-4088-b97d-9899b3591166',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 3,
                'role_id' => 1
            ],
            [
                'first_name' => 'Alan',
                'last_name' => 'Brande',
                'photo' => 'https://jasform-pub.s3.us-west-2.amazonaws.com/alanBrande.jpeg',
                'position_in_org' => 'CEO & Founder',
                'is_active' => true,
                'email' => 'alan@lightit.io',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Cor6ea8-Degree-Cohesive'),
                'remember_token' => 'f7cced39-b7d0-4367-b9a4-45ccd3340747',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 3,
                'role_id' => 1
            ],
            [
                'first_name' => 'Javier',
                'last_name' => 'Lempert',
                'photo' => 'https://jasform-pub.s3.us-west-2.amazonaws.com/javierLempert.jpeg',
                'position_in_org' => 'CTO & Founder',
                'is_active' => true,
                'email' => 'javier@lightit.io',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Pos5box-Filter-Afoot1'),
                'remember_token' => 'af13ca6e-be50-4941-94a6-8dde93616371',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 3,
                'role_id' => 1
            ],
            [
                'first_name' => 'Adam',
                'last_name' => 'Mallat',
                'photo' => 'https://jasform-pub.s3.us-west-2.amazonaws.com/adamMallat.jpeg',
                'position_in_org' => 'Innovation Manager',
                'is_active' => true,
                'email' => 'adam.mallat@lightit.io',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Sn4ring1-Swan-Walnut'),
                'remember_token' => '3bac89e9-64dc-4a46-833a-4bb3314a0049',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 3,
                'role_id' => 1
            ],
            [
                'first_name' => 'Agustin',
                'last_name' => 'Pereira',
                'photo' => 'https://jasform-pub.s3.us-west-2.amazonaws.com/agustinPereira.png',
                'position_in_org' => 'Software Developer',
                'is_active' => true,
                'email' => 'agustin@jasform.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('O4tline9-Custodian-Registry'),
                'remember_token' => '5f4971dd-b298-43e2-852a-e59be023b210',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 1,
                'role_id' => 1
            ],
            [
                'first_name' => 'Joaquin',
                'last_name' => 'Segovia',
                'photo' => 'https://jasform-pub.s3.us-west-2.amazonaws.com/joaquinSegovia.png',
                'position_in_org' => 'Software Developer',
                'is_active' => true,
                'email' => 'joaquin@jasform.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Che3ist8-Syndrome-Ashy'),
                'remember_token' => '0fe46fb3-eadf-4088-b97d-9899b3591166',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 1,
                'role_id' => 1
            ],
            [
                'first_name' => 'Sebastian',
                'last_name' => 'Insausti',
                'photo' => 'https://jasform-pub.s3.us-west-2.amazonaws.com/sebastianInsausti.png',
                'position_in_org' => 'Software Developer',
                'is_active' => true,
                'email' => 'sebastian@jasform.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Cor6ea8-Degree-Cohesive'),
                'remember_token' => 'f7cced39-b7d0-4367-b9a4-45ccd3340747',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 1,
                'role_id' => 1
            ],
            [
                'first_name' => 'UDE',
                'last_name' => 'User',
                'photo' => 'https://jasform-pub.s3.us-west-2.amazonaws.com/UDE.jpg',
                'position_in_org' => 'Jury Member',
                'is_active' => true,
                'email' => 'udeuser@yopmail.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Pos5box-Filter-Afoot1'),
                'remember_token' => '0fe46fb3-eadf-4088-b97d-9899b3591166',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 3,
                'role_id' => 2
            ],
            [
                'first_name' => 'Angela',
                'last_name' => 'Smith',
                'photo' => 'https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-06.jpg',
                'position_in_org' => 'Web designer',
                'is_active' => false,
                'email' => 'angelalsmith@armyspy.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('O4tline9-Custodian-Registry'),
                'remember_token' => '5f4971dd-b298-43e2-852a-e59be023b210',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 2,
                'role_id' => 1
            ],
            [
                'first_name' => 'Scott',
                'last_name' => 'Dowler',
                'photo' => 'https://static.generated.photos/vue-static/face-generator/landing/wall/12.jpg',
                'position_in_org' => 'Patient educator',
                'is_active' => false,
                'email' => 'scottsdowler@rhyta.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Che3ist8-Syndrome-Ashy'),
                'remember_token' => '0fe46fb3-eadf-4088-b97d-9899b3591166',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 2,
                'role_id' => 1
            ],
            [
                'first_name' => 'Nolan',
                'last_name' => 'Longnecker',
                'photo' => 'https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-02.jpg',
                'position_in_org' => 'Atmospheric scientist',
                'is_active' => false,
                'email' => 'nolanmlongnecker@dayrep.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Cor6ea8-Degree-Cohesive'),
                'remember_token' => 'f7cced39-b7d0-4367-b9a4-45ccd3340747',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 1,
                'role_id' => 2
            ],
            [
                'first_name' => 'Dustin',
                'last_name' => 'Gentry',
                'photo' => 'https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-07.jpg',
                'position_in_org' => 'Health care interpreter',
                'is_active' => false,
                'email' => 'dustinkgentry@teleworm.us',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Pos5box-Filter-Afoot1'),
                'remember_token' => 'af13ca6e-be50-4941-94a6-8dde93616371',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 2,
                'role_id' => 1
            ],
            [
                'first_name' => 'Bertha',
                'last_name' => 'McDavid',
                'photo' => 'https://cdnstorage.sendbig.com/unreal/female.webp',
                'position_in_org' => 'Tax examiner',
                'is_active' => false,
                'email' => 'berthadmcdavid@dayrep.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Sn4ring1-Swan-Walnut'),
                'remember_token' => '3bac89e9-64dc-4a46-833a-4bb3314a0049',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 2,
                'role_id' => 2
            ],
            // [
            //     'first_name' => 'UserTest',
            //     'last_name' => 'WithOutAngPhotoLink',
            //     'photo' => '',
            //     'position_in_org' => 'Tax examiner',
            //     'is_active' => true,
            //     'email' => 'usertestwithoutphoto@dayrep.com',
            //     'email_verified_at' => Carbon::now(),
            //     'password' => Hash::make('Pesticide-Mousy-Unsightly7'),
            //     'remember_token' => '3bac89e9-64dc-4a46-833a-4bb3314a0049',
            //     'created_at' => Carbon::now(),
            //     'updated_at' => Carbon::now(),
            //     'organization_id' => 3,
            //     'role_id' => 2
            // ],
            // [
            //     'first_name' => 'UserTestAngSecond',
            //     'last_name' => 'WithInvalidPhotoLink',
            //     'photo' => 'https://static.generated.photos/vue-static/face-generator/landing/wall/12.jpgN/A',
            //     'position_in_org' => 'Tax iTexaminer',
            //     'is_active' => true,
            //     'email' => 'usertestwithphoto@dayrep.com',
            //     'email_verified_at' => Carbon::now(),
            //     'password' => Hash::make('Earpiece-Pa4asail-Jarring5'),
            //     'remember_token' => '3bac89e9-64dc-4a46-833a-4bb3314a0049',
            //     'created_at' => Carbon::now(),
            //     'updated_at' => Carbon::now(),
            //     'organization_id' => 3,
            //     'role_id' => 1
            // ]
        ]);
    }
}
