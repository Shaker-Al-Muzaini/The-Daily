{ pkgs }: {
  deps = [
    pkgs.nano
    pkgs.php83           # تحديث لآخر إصدار مستقر يدعم ميزات Laravel الحديثة
    pkgs.php83Packages.composer
    pkgs.nodejs_20       # إصدار LTS يتوافق مع معظم ميزات React الحديثة
    pkgs.sqlite          # مفيد جداً كقاعدة بيانات سريعة للتطوير على Replit
  ];
}