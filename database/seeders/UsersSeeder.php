<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;

use Domain\Users\Models\User;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'first_name'=>'Admin',
            'last_name'=>'Istrator',
            'photo'=>'NA',
            'phone'=>'12345',
            'position_in_organization'=>'Gerente',
            'status'=>'Active',
            'email'=>'admin@org.cmon',
            'password'=>Hash::make('root123'),
            'organization_id'=>'1',
        ]);
    }
}
