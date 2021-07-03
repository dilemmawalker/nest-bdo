public class Solution {
	public ArrayList<Integer> grayCode(int a) {
	    ArrayList<Integer>arr=new ArrayList<>();
        arr.add(0);
        arr.add(1);
        solve(arr,a);
        return arr;
	}
    public static void solve(ArrayList<Integer>arr,int n){
        for(int i=1;i<n;i++){
            int s=arr.size();
            for(int j=s-1;j>=0;j--){
                arr.add(arr.get(j) + (1<<i));
            }
        }
    }
}
