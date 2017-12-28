module Logic.Common {
  export class Entity {
    public Id: number;
    // public Equals(obj: Object): boolean {
    //   var other = __as__<Entity>(obj, Entity);
    //   if (ReferenceEquals(other, null))
    //     return false;
    //   if (ReferenceEquals(this, other))
    //     return true;
    //   if (this.GetRealType() != other.GetRealType())
    //     return false;
    //   if (this.Id == 0 || other.Id == 0)
    //     return false;
    //   return this.Id == other.Id;
    // }
    // public OperatorEquals(b: Entity): boolean {
    //   var a = this;
    //   if (ReferenceEquals(a, null) && ReferenceEquals(b, null))
    //     return true;
    //   if (ReferenceEquals(a, null) || ReferenceEquals(b, null))
    //     return false;
    //   return a.Equals(b);
    // }

    // public OperatorNotEqual(b: Entity): boolean {
    //   var a = this;
    //   return !(a == b);
    // }

    // public GetHashCode(): number {
    //   return (this.GetRealType().ToString() + this.Id).GetHashCode();
    // }
    // private GetRealType(): Type {
    //   return NHibernateProxyHelper.GetClassWithoutInitializingProxy(this);
    // }
  }
}
