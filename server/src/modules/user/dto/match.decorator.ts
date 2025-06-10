import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

/**
 * 自定义装饰器：用于校验某字段与目标字段值是否一致
 * @param property 需要匹配的目标字段名
 * @param validationOptions 校验选项（如自定义错误信息）
 */
export function Match(property: string, validationOptions?: ValidationOptions) {
  // 返回一个装饰器函数
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'match', // 装饰器名称
      target: object.constructor, // 目标类
      propertyName: propertyName, // 当前被装饰的属性名
      options: validationOptions, // 校验选项
      constraints: [property], // 约束参数，这里是目标字段名
      validator: {
        /**
         * 校验逻辑：判断当前字段值与目标字段值是否相等
         * @param value 当前字段的值
         * @param args 校验参数，包含目标对象等
         */
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints; // 取出目标字段名
          return value === (args.object as any)[relatedPropertyName]; // 比较两个字段值
        },
        /**
         * 默认错误消息
         */
        defaultMessage(args: ValidationArguments) {
          return `${args.property} 与 ${args.constraints[0]} 字段不匹配`;
        },
      },
    });
  };
}
