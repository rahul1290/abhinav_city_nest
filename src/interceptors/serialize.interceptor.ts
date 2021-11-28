import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";

interface ClassConstructr{
    new (...agrs:any[]):{};
}

export function Serialize(dto:ClassConstructr){
    return UseInterceptors(new SerializeInterceptors(dto));
}
 export class SerializeInterceptors implements NestInterceptor{
    constructor(private dto:any){}
     intercept(context:ExecutionContext,handler:CallHandler):Observable<any>{
        //console.log('Im running before the handler.',context);
        return handler.handle().pipe(
            map((data:any) => {
                // console.log('Im running before response is send out',data);
                return plainToClass(this.dto,data,{
                    excludeExtraneousValues : true
                })
            })
        )
     }
 }