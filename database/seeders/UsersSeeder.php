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
                'first_name' => 'Angela',
                'last_name' => 'Smith',
                'photo' => 'https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-06.jpg',
                'position_in_organization' => 'Web designer',
                'is_active' => true,
                'email' => 'angelalsmith@armyspy.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('oWahgae3'),
                'remember_token' => '5f4971dd-b298-43e2-852a-e59be023b210',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 1
            ],
            [
                'first_name' => 'Scott',
                'last_name' => 'Dowler',
                'photo' => 'https://static.generated.photos/vue-static/face-generator/landing/wall/12.jpg',
                'position_in_organization' => 'Patient educator',
                'is_active' => false,
                'email' => 'scottsdowler@rhyta.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('caiNg5Sou2oo'),
                'remember_token' => '0fe46fb3-eadf-4088-b97d-9899b3591166',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 2
            ],
            [
                'first_name' => 'Nolan',
                'last_name' => 'Longnecker',
                'photo' => 'https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-02.jpg',
                'position_in_organization' => 'Atmospheric scientist',
                'is_active' => true,
                'email' => 'nolanmlongnecker@dayrep.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Nie8xielie'),
                'remember_token' => 'f7cced39-b7d0-4367-b9a4-45ccd3340747',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 1
            ],
            [
                'first_name' => 'Dustin',
                'last_name' => 'Gentry',
                'photo' => 'https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-07.jpg',
                'position_in_organization' => 'Health care interpreter',
                'is_active' => true,
                'email' => 'dustinkgentry@teleworm.us',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('dei4XaeN5oh'),
                'remember_token' => 'af13ca6e-be50-4941-94a6-8dde93616371',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 2
            ],
            [
                'first_name' => 'Bertha',
                'last_name' => 'McDavid',
                'photo' => 'https://cdnstorage.sendbig.com/unreal/female.webp',
                'position_in_organization' => 'Tax examiner',
                'is_active' => true,
                'email' => 'berthadmcdavid@dayrep.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Oongox2vei'),
                'remember_token' => '3bac89e9-64dc-4a46-833a-4bb3314a0049',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 3
            ],
            [
                'first_name' => 'UserTest',
                'last_name' => 'WithOutAngPhotoLink',
                'photo' => '',

                'position_in_organization' => 'Tax examiner',
                'is_active' => true,
                'email' => 'usertestwithoutphoto@dayrep.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Oongox2vei'),
                'remember_token' => '3bac89e9-64dc-4a46-833a-4bb3314a0049',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 3
            ],
            [
                'first_name' => 'UserTestAngSecond',
                'last_name' => 'WithInvalidPhotoLink',
                'photo' => 'https://static.generated.photos/vue-static/face-generator/landing/wall/12.jpgN/A',

                'position_in_organization' => 'Tax iTexaminer',
                'is_active' => true,
                'email' => 'usertestwithphoto@dayrep.com',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('Oongox2vei'),
                'remember_token' => '3bac89e9-64dc-4a46-833a-4bb3314a0049',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'organization_id' => 3
            ]
        ]);
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
        DB::table('user_role')->insert([
            [
                'user_id' => 1,
                'role_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'user_id' => 2,
                'role_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'user_id' => 3,
                'role_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'user_id' => 4,
                'role_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 5,
                'role_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);
    }
}
