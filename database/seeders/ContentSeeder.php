<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => ['en' => 'Digital Assets', 'ar' => 'الأصول الرقمية'],
                'slug' => 'digital-assets',
            ],
            [
                'name' => ['en' => 'Software Solutions', 'ar' => 'حلول البرمجيات'],
                'slug' => 'software-solutions',
            ],
        ];

        foreach ($categories as $cat) {
            $category = Category::updateOrCreate(['slug' => $cat['slug']], $cat);

            if ($cat['slug'] === 'digital-assets') {
                Post::updateOrCreate(
                    ['slug' => 'premium-ui-kit'],
                    [
                        'category_id' => $category->id,
                        'title' => ['en' => 'Premium UI Kit', 'ar' => 'مجموعة واجهة مستخدم متميزة'],
                        'content' => [
                            'en' => 'A comprehensive UI kit for modern web applications. Includes over 500 components.',
                            'ar' => 'مجموعة واجهة مستخدم شاملة لتطبيقات الويب الحديثة. تتضمن أكثر من 500 مكون.'
                        ],
                        'excerpt' => [
                            'en' => 'The ultimate UI kit for designers and developers.',
                            'ar' => 'مجموعة واجهة المستخدم المثالية للمصممين والمطورين.'
                        ],
                        'is_published' => true,
                        'featured_image' => 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop',
                    ]
                );

                Post::updateOrCreate(
                    ['slug' => '3d-icon-pack'],
                    [
                        'category_id' => $category->id,
                        'title' => ['en' => '3D Icon Pack', 'ar' => 'حزمة أيقونات ثلاثية الأبعاد'],
                        'content' => [
                            'en' => 'High-quality 3D icons for your next project. Available in multiple formats.',
                            'ar' => 'أيقونات ثلاثية الأبعاد عالية الجودة لمشروعك القادم. متوفرة بتنسيقات متعددة.'
                        ],
                        'excerpt' => [
                            'en' => 'Make your designs pop with 3D elements.',
                            'ar' => 'اجعل تصميماتك تبرز بالعناصر ثلاثية الأبعاد.'
                        ],
                        'is_published' => true,
                        'featured_image' => 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop',
                    ]
                );
            } else {
                Post::updateOrCreate(
                    ['slug' => 'ecommerce-engine'],
                    [
                        'category_id' => $category->id,
                        'title' => ['en' => 'E-commerce Engine', 'ar' => 'محرك التجارة الإلكترونية'],
                        'content' => [
                            'en' => 'A powerful engine to run your online store. Scalable and secure.',
                            'ar' => 'محرك قوي لإدارة متجرك عبر الإنترنت. قابل للتوسع وآمن.'
                        ],
                        'excerpt' => [
                            'en' => 'The only engine you need for e-commerce.',
                            'ar' => 'المحرك الوحيد الذي تحتاجه للتجارة الإلكترونية.'
                        ],
                        'is_published' => true,
                        'featured_image' => 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop',
                    ]
                );
            }
        }
    }
}
